import React, { useState } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:8080/ws-message';

const Test = () => {
    const[clientref, setcr]=useState(null)
    const [message,setmessage]=useState("")
    
  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    console.log(msg.name);
    setmessage(msg.name)
  }
  

  let send=async ()=>{
    console.log("sent message")
    clientref.sendMessage('/app/sendMessage',JSON.stringify({"name":"sent from original client"}))
    const res = await fetch("http://localhost:8080/send",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({"roomid":"asqwew",
        "imgsrc":"base64"})
    })
    console.log(res)
  }
  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
        ref={ (client) => { setcr(client) }} 
      />
      <button onClick={send}>click here</button>
      <div>{message}</div>
    </div>
  );
}

export default Test;