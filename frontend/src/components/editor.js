import { useState } from "react";
import FilerobotImageEditor, { TABS, TOOLS } from "react-filerobot-image-editor";
import { Form, useNavigate } from "react-router-dom";
function Editor() {
    const [tim, settim] = useState()
    const [show, setshow] = useState(false)
    const [albums, setalbums] = useState([])
    const [src, setsrc] = useState(null)
    const [imgname, setimgname] = useState(null)
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
    return (
        <div className="m-2 h-[80%] ">
            {show && <div className=" w-[50%] absolute m-auto bg-slate-50 left-0 right-0 ml-auto mr-auto z-[1500] p-2 mx-3 rounded-lg max-h-80 overflow-y-auto border border-grey-200 shadow-md my-3 ">
                <div className="flex flex-row justify-around" >
                    <button className="bg-blue-300 p-1 rounded " onClick={showalbums}>Add to album</button>
                    <button className="bg-blue-300 p-1 rounded">Download </button>
                </div>
                <div className="mt-2 grid grid-flow-row gap-2 ">
                    <h1 className="text-center"> Select an album </h1>
                    {albums.map((n) => (
                        <button onClick={chosealbum} name={n} className="border border-black rounded-md">{n}</button>
                    ))}
                </div>

            </div>}
            {!tim && 
                <div class="flex items-center justify-center w-full h-full mt-5 ">
                    <label class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div class="flex flex-col items-center justify-center h-full  pt-5 pb-6">
                            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">PNG / JPG / JPEG </p>
                        </div>
                        <input id="dropzone-file" type="file" onChange={upimg} className="hidden" />
                    </label>
                </div>
                }
                
            
                {tim && <div className="h-full">
                <FilerobotImageEditor
                    source={tim}
                    onSave={(editedimageobj, designstate) => {
                        setshow(true)
                        setimgname(editedimageobj.name)
                        setsrc(editedimageobj.imageBase64)
                        console.log('saved', editedimageobj, designstate)
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

export default Editor;