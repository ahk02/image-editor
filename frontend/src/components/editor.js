import { useState } from "react";
import FilerobotImageEditor, { TABS, TOOLS } from "react-filerobot-image-editor";
import { useNavigate } from "react-router-dom";
function Editor() {
    const [tim, settim] = useState(null)
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
            const formdata = new FormData()
            formdata.append('id', localStorage.user +"/"+ file.name)
            formdata.append('user', localStorage.user)
            formdata.append("imgname", file.name)
            formdata.append("source", finalb64)
            const res = await fetch("http://localhost:8080/image/add", {
                method: "POST",
                body: formdata
            })
            const text = await res.text()
            alert(text)
        }
    }
    const logout=()=>{
        localStorage.removeItem('user')
    alert("logged out")
    nav('/login')
    }
    return (
        <div className="m-2 h-screen">
            <button onClick={logout}>logout </button>
            <h1>upload image</h1>
            {!tim && <input type="file" name="upload" onChange={upimg} />}
            <div className="h-[90%]">
            {tim && <FilerobotImageEditor 
                source={tim}
                onSave={(editedimageobj, designstate) => {
                    console.log('saved', editedimageobj, designstate)
                }}
                moreSaveOptions={[
                    {
                        label:"Add to Album",
                        onClick:(triggerSaveModal,triggerSave)=>triggerSave((...args)=>{
                            console.log("works",args)
                        }),
                    },
                    {
                        label:"Discard image",
                        onClick:(triggerSaveModal,triggerSave)=>triggerSave((...args)=>{
                            console.log("works",args)
                        }),
                    },
                ]}
                showCanvasOnly={false}
                onBeforeSave={(test) => console.log(test)}
                onModify={(designstate) => {
                    console.log(designstate)
                }}
                useZoomPresetsMenu={true}
                observePluginContainerSize={false}
            />}
            </div>
            {/* {tim && <img src={tim} />} */}
        </div>
    );
}

export default Editor;