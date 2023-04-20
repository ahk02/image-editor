package com.example.ImageEditor;

import java.io.*;
import java.net.*;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/room")
@CrossOrigin
public class RoomController {
    @Autowired RoomRepository roomRepository;
    @PostMapping("/createRoom")
    public @ResponseBody String create_room(@RequestParam String owner_id) {
//        System.out.println(owner_id + " " + img);
        Room r;
        long id;
        do {
            id = (long) (Math.random() * 100000);
            System.out.println("id "+id);
            r = roomRepository.findById(id);
        }while(r != null );
        Long id_ = new Long(id);
        List<String> ips = new ArrayList<>();
        r = new Room(id, owner_id, new ArrayList<String>(), null);
        //roomRepository.save(r);
        System.out.println(id);
        return id_.toString();
    }
    @PostMapping("/addimg")
    public @ResponseBody String addimg(@RequestParam Long room_id, @RequestParam String img) {
        Room r = roomRepository.findById(room_id);
        if(r == null) 
            return "Room does not exist";
        r.setImg(img);
        roomRepository.save(r);
        System.out.println(room_id+" "+img);
        return "Successful";
    }

    @PostMapping("/join")
    public @ResponseBody String addusers(@RequestParam Long room_id, @RequestParam String user_id) {
        Room r = roomRepository.findById(room_id);
        if(r == null)
            return "Room does not exist";
        List<String> users = r.getUsers();
        users.add(user_id);
        r.setUsers(users);
        //List<String> ips = r.getIp();
        //ips.add(user_id);
        //r.setIp(ips);
        roomRepository.save(r);
        return "Done!";
    }
    //Proxy - WebController
    //Builder
    //Singleton - Room Id
    //Prototype?
}
