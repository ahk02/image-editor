import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Joinroom(props) {
  const [code, setcode] = useState()
  const nav = useNavigate()
  const join = async (event) => {
    event.preventDefault()
    const formdata = new FormData()
    formdata.append('room_id', code)
    formdata.append('user_id', localStorage.user)
    const res = await fetch("http://localhost:9000/room/join", {
      method: "POST",
      body: formdata
    })
    const text = await res.text()
    if (text === "false")
      alert("Invalid room id")
    else {
      alert("Succesfully joined")
      props.setjr(false)
      nav("/room/" + code)
    }
  }
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={join}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" >
            Enter the room id
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text" placeholder="Roomid" onChange={(event) => setcode(event.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="Submit">
            Join
          </button>
        </div>
      </form>
    </div>);
}

export default Joinroom;