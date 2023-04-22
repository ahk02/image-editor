package com.example.ImageEditor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
@CrossOrigin
public class Usercontroller {
    @Autowired
    private UserRepository ur;
    @GetMapping
    public  @ResponseBody String base(){
        return "user controller running";
    }
    @PostMapping("/signup")
    public @ResponseBody String adduser(@RequestParam String email,@RequestParam String password){
        ur.save(new User(email,email,password));
        return email;
    }
    @PostMapping("/signin")
    public @ResponseBody Boolean checkuser(@RequestParam String email,@RequestParam String password){
        User user = ur.findByEmail(email);
        if(user==null)
            return false;
        else if(user.getPassword().equals(password))
            {
                return true;
            }
        return false;
    }

}
