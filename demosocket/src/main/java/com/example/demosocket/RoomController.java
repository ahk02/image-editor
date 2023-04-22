package com.example.demosocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;


@Controller
@RequestMapping("/room")
@CrossOrigin
public class RoomController {
    @Autowired RoomRepository roomRepository;
    @PostMapping("/createRoom")
    public @ResponseBody String create_room(@RequestParam String owner_id,@RequestParam String img) {
//        System.out.println(owner_id + " " + img);
        Random rnd = new Random();
        int num = rnd.nextInt(999999);
        Room r=new Room(String.format("%06d",num),owner_id,img);
        roomRepository.save(r);
        return r.getId();
    }
    @PostMapping("/getimg")
    public @ResponseBody String getimg(@RequestParam String room_id) {
        Optional<Room> r = roomRepository.findById(room_id);
        return r.get().getImg();
    }
//
    @PostMapping("/join")
    public @ResponseBody Boolean addusers(@RequestParam String room_id, @RequestParam String user_id) {

        Optional<Room> r =roomRepository.findById(room_id);
        if(r.isEmpty())
            return false;
        else
        {
            r.get().adduser(user_id);
            roomRepository.save(r.get());
            return true;
        }

    }
    //Proxy - WebController
    //Builder
    //Singleton - Room Id
    //Prototype?
}
