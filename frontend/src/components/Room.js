import { useEffect, useState } from "react";
import FilerobotImageEditor, { TABS, TOOLS } from "react-filerobot-image-editor";
import { useLocation, useNavigate } from "react-router-dom";
import SockJsClient from 'react-stomp';
const SOCKET_URL = 'http://localhost:8080/ws-message';

function Room() {
    const [tim, settim] = useState()
    const [show, setshow] = useState(false)
    const [albums, setalbums] = useState([])
    const [src, setsrc] = useState(null)
    const [imgname, setimgname] = useState(null)
    const loc = useLocation()
    const[clientref, setcr]=useState(null)
    const[roomid, setroomid] = useState(0)
    useEffect(()=>{
        const formdata = new FormData()
        formdata.append('owner_id', localStorage.user)
        fetch("http://localhost:8080/room/createRoom", {
            method: "POST",
            body: formdata
        }).then(res => res.json()).then((res)=>{
            console.log('response = ',res)
            setroomid(res)
        }
        )
    },[])
    const nav = useNavigate()
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
            // const formdata = new FormData()
            // formdata.append('id', localStorage.user + "/" + file.name)
            // formdata.append('user', localStorage.user)
            // formdata.append("imgname", file.name)
            // formdata.append("source", finalb64)
            // const res = await fetch("http://localhost:8080/image/add", {
            //     method: "POST",
            //     body: formdata
            // })
            // const text = await res.text()
            // alert(text)
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
    const getroomid = async (event) => {
        const file = event.target.files[0]
        console.log(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        var finalb64
        reader.onload = async () => {
            const base64 = reader.result.split(",")[1]
            finalb64 = `data:${file.type};base64,${base64}`
            fetch("http://localhost:8080/addimg",{
                method:'POST',
                body: finalb64
            }).then(res => {settim(finalb64)})
        }
    } 
    const chosealbum = async (e) => {
        console.log(e.target.name)
        console.log(imgname)
        console.log(src)
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
    let send=async ()=>{
        console.log("sent message")
        console.log(src)
        //clientref.sendMessage('/app/sendMessage',JSON.stringify({"name":"sent from original client"}))
        const res = await fetch("http://localhost:8080/send",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"room_id":Number(roomid), "imgsrc": tim})
        })
        console.log(res)
      }
      let onMessageReceived = (usrc) => {
        console.log(usrc.name);
        settim(usrc.name)
      }
      let onConnected = () => {
        console.log("Connected!!")
      }
      let onOpen = () => {
        
      }
      let socket1 = () => {
        
      }
    return (
        <div className="m-2 h-[80%] ">
            <div>Your Room Id is {roomid}</div>
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/message']}
                onConnect={onConnected}
                onOpen = {onOpen}
                onDisconnect={console.log("Disconnected!")}
                onMessage={usrc => onMessageReceived(usrc)}
                debug={false}
                // ref={(client) => { setcr(client) }}
            />
            {!tim && <div class="flex items-center justify-center w-full h-full mt-5 ">
                    <label class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div class="flex flex-col items-center justify-center h-full  pt-5 pb-6">
                            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">PNG / JPG / JPEG </p>
                        </div>
                        <input id="dropzone-file" type="file" onChange={getroomid} className="hidden" />
                    </label>
                </div>
            }
            {tim && <div className="h-full">
                <FilerobotImageEditor
                    source={tim}
                    onSave={async (editedimageobj, designstate) => {
                        if(loc.pathname.startsWith("/room"))
                        {
                            setsrc(editedimageobj.imageBase64)
                            await send()
                        }else
                        {setshow(true)
                        setimgname(editedimageobj.name)
                        setsrc(editedimageobj.imageBase64)
                        console.log('saved', editedimageobj, designstate)}
                    }}
                    showCanvasOnly={false}
                    onBeforeSave={(test) => console.log(test)}
                    onModify={(designstate) => {
                        console.log(designstate)
                    }}
                    useZoomPresetsMenu={true}
                    observePluginContainerSize={true}

                />
            </div>}

            {/* {tim && <img src={tim} />} */}
        </div>
    );
}

export default Room;