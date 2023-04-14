package com.example.ImageEditor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@RequestMapping("/user")
public class Usercontroller {
    @Autowired
    private UserRepository ur;
    @GetMapping
    public  @ResponseBody String base(){
        return "server running";
    }
    @PostMapping("/adduser")
    public @ResponseBody String adduser(@RequestParam String user,@RequestParam String password){
        ur.save(new User(user,user,password));
        return user;
    }
    @GetMapping("/getusers")
    public @ResponseBody void getuser(){
        ur.findAll().forEach(u->System.out.println(u.getEmail()));
    }
}
