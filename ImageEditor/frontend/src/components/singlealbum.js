import { useState } from "react";

function Singlealbum(props) {
    const [images, setImages] = useState([]);
    const [showimg, setshowimg]=useState(false)
    const getImagesFromBacked = async () => {
        if (props.name !== '') {
          const formData = new FormData()
          formData.append("albumName", props.name)
          formData.append("creator", localStorage.user)
          const res = await fetch('http://localhost:8080/album/getimages', {
            method: "POST",
            body: formData
          })
          const json = await res.json()
          setImages([...json]) 
          setshowimg(true)
          console.log(json)
        }
      }
      const handleDeleteImage = (image) => {
        const sendDeleteImageRequest = async () => {
          const formData = new FormData()
            formData.append("albumName", props.name)
            formData.append("imgName", image)
            formData.append("username", localStorage.user)
    
            const res = await fetch('http://localhost:8080/album/deleteImg', {
              method: "POST",
              body: formData
            })
            console.log(res)
            const newImages = images.filter((img) => {
              if (img.imgname !== image) {
                return img
              }
            })
            setImages(newImages)
        }
        sendDeleteImageRequest()
      };
    return ( 
        <div className="flex justify-start items-center mb-4 mx-5 ">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 ">Album {props.name}</h5>
        {/* <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 ">test</h5> */}
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">test</p>
        {showimg ? <button onClick={()=>{setshowimg(false)}} className="text-white bg-red-500 hover:bg-red-600  focus:ring-red-300  rounded-lg p-2 text-center ">hide images</button> :<button onClick={getImagesFromBacked} className="text-white bg-blue-500 hover:bg-blue-600  focus:ring-blue-300  rounded-lg p-2 text-center">View Images</button>}
        {showimg ? <div className="grid grid-cols-3 gap-4 mt-4"> {images.map((i)=>(
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg p-5 ">
            <div className= "flex justify-center rounded-3xl ">
                <img className="p-8 rounded-t-lg aspect-[3/2] object-center object-none h-60 " src={i.source} alt="loading" />
            </div>
            <div className="px-5 pb-5">
                    <p className="text-2xl font-medium tracking-tight text-gray-900 text-center">{i.imgname }</p>
            </div>
            <div className='grid grid-flow-col gap-5'>
                    <button className="px-2 py-1 bg-blue-500 text-white rounded-lg">Edit</button>
                    <button onClick={() => handleDeleteImage(i.imgname)} className="px-2 py-1 bg-red-500 text-white rounded-lg">Delete</button>
                    
            </div>
        </div>
        ))}</div>:null}
        </div>
        </div>
     );
}

export default Singlealbum;