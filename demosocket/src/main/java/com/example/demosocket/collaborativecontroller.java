package com.example.demosocket;

import java.io.Console;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class collaborativecontroller {
	
	@Autowired
    	SimpMessagingTemplate template;
	@Autowired
		RoomRepository rr;
	
	@PostMapping("/send")
	public ResponseEntity<Void> sendMessage(@RequestBody imgmessage details) {
        Optional<Room> r=rr.findById(details.getRoom_id());
		r.get().setImg(details.getImgsrc());
		rr.save(r.get());
		template.convertAndSend("/topic/message", details);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@MessageMapping("/sendMessage")
	public String receiveMessage(@Payload String room_id) {
        return null;
	}

	@SendTo("/topic/message")
	public imgmessage broadcastMessage(@Payload imgmessage details) {
        System.out.println(details.getRoom_id());
		return details;
	}
}