import { useNavigate } from "react-router-dom"

function Creatroom(props) {
    const nav = useNavigate()
    const roomcreate=async (event) => {
        const file = event.target.files[0]
        console.log(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        var finalb64
        reader.onload = async () => {
            const base64 = reader.result.split(",")[1]
            finalb64 = `data:${file.type};base64,${base64}`
            const formdata = new FormData()
            formdata.append("owner_id",localStorage.user)
            formdata.append("img",finalb64)
            const res = await fetch("http://localhost:9000/room/createRoom",{
                method:"POST",
                body:formdata
            })
            const text = await res.text()
            alert("room created successfully")
            props.setcr(false)
            nav("/room/"+text)
        }
    }


    return ( <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-2 mb-4" onSubmit={roomcreate}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" >
          Upload an img
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username" type="file" placeholder="image" onChange={roomcreate} />
      </div>
      {/* <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="Submit">
          confirm
        </button>
      </div> */}
    </form>
  </div> );
}

export default Creatroom;