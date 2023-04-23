import { useEffect, useState } from "react";
import FilerobotImageEditor from "react-filerobot-image-editor";
import { useLocation, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
const SOCKET_URL = 'http://localhost:9000/ws-message';

function Editor() {
    const [tim, settim] = useState()
    const [show, setshow] = useState(false)
    const [albums, setalbums] = useState(null)
    const [src, setsrc] = useState(null)
    const [imgname, setimgname] = useState(null)
    const loc = useLocation()
    const param = useParams()
    const [stompClient, setcr] = useState(null)
    const socket = new SockJS(SOCKET_URL);
    useEffect(() => {
        if (loc.pathname.startsWith("/room")) {
            const stompClient = Stomp.over(socket);
            stompClient.connect({}, (x) => {
                console.log("connected to server", x)
                setcr(stompClient)
            })
        }

    }, []);
    useEffect(() => {
        if (loc.state)
            settim(loc.state.imgsrc)
    }, []);
    useEffect(() => {
        if (loc.pathname.startsWith("/room")) {
            if (stompClient) {
                stompClient.subscribe('/topic/message', (message) => {
                    const temp = JSON.parse(message.body)
                    if (temp.user !== localStorage.user)
                        settim(temp.imgsrc)
                });
            }
        }
    }, [stompClient]);

    useEffect(() => {
        if (loc.pathname.startsWith("/room") && !tim) {
            const getimg = async () => {
                const formdata = new FormData()
                formdata.append('room_id', param.id)
                const res = await fetch("http://localhost:9000/room/getimg", {
                    method: "POST",
                    body: formdata
                })
                const text = await res.text()
                settim(text)
            }
            getimg()
        }
    }, []);

    const upimg = async (event) => {
        const file = event.target.files[0]
        console.log(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        var finalb64
        reader.onload = async () => {
            const base64 = reader.result.split(",")[1]
            finalb64 = `data:${file.type};base64,${base64}`
            settim(finalb64)
        }
    }
    const showalbums = async () => {
        console.log("clicked")
        const formdata = new FormData()
        formdata.append('creator', localStorage.user)
        const res = await fetch("http://localhost:8080/album/getalbums", {
            method: "POST",
            body: formdata
        })
        const json = await res.json()
        setalbums([...json])

    }

    const chosealbum = async (e) => {
        const formdata = new FormData()
        formdata.append('albumname', e.target.name)
        formdata.append('username', localStorage.user)
        formdata.append('imgname', imgname)
        formdata.append('source', src)
        const res = await fetch("http://localhost:8080/album/addimage", {
            method: "POST",
            body: formdata
        })
        const text = await res.text()
        alert(text)
        setshow(false)
    }
    let send = async (tmp) => {
        const res = await fetch("http://localhost:9000/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "user": localStorage.user, "room_id": param.id, "imgsrc": tmp })
        })
        console.log(res)
    }

    return (
        <div className="m-2 h-[80%] ">
            {show && <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 w-[75%]">
                    <div className="flex flex-row justify-around" >
                        <button className="bg-blue-600 text-white p-1 rounded " onClick={showalbums}>Add to album</button>
                        <button className="bg-blue-600 text-white p-1 rounded">Download </button>
                    </div>
                    <div className="mt-2 grid grid-flow-row gap-2 ">
                        {albums && <h1 className="text-center"> Select an album </h1>}
                        {albums && albums.map((n) => (
                            <button onClick={chosealbum} name={n} className="border border-black rounded-md bg-blue-300 ">{n}</button>
                        ))}
                    </div>
                </div>
            </div>}
            {!tim &&
                <div className="flex items-center justify-center w-full h-full mt-5 ">
                    <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center h-full  pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG / JPG / JPEG </p>
                        </div>
                        <input id="dropzone-file" type="file" onChange={upimg} className="hidden" />
                    </label>
                </div>
            }


            {tim && <div className="h-full">
                <FilerobotImageEditor
                    source={tim}
                    onSave={(editedimageobj, designstate) => {
                        if (loc.pathname.startsWith("/room")) {
                            send(editedimageobj.imageBase64)
                        } else {
                            console.log(editedimageobj.name)
                            setshow(true)
                            setimgname(editedimageobj.name)
                            setsrc(editedimageobj.imageBase64)
                        }
                    }}
                    showCanvasOnly={false}
                    onBeforeSave={(editedimageobj) => {
                        if (loc.state)
                            editedimageobj.name = loc.state.name
                    }}
                    onModify={(designstate) => {
                        console.log(designstate)
                    }}
                    useZoomPresetsMenu={true}
                    observePluginContainerSize={true}

                />
            </div>}
        </div>
    );
}

export default Editor;