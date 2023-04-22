package com.example.ImageEditor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
@CrossOrigin
public class ProxyUserController implements UserControllerInterface {
    @Autowired
    //private UserRepository ur;
    private Usercontroller uc;
    
    @GetMapping
    public  @ResponseBody String base(){
        return "user controller running";
    }
    @PostMapping("/signup")
    public @ResponseBody String adduser(@RequestParam String email,@RequestParam String password){
        // ur.save(new User(email,email,password));
        return uc.adduser(email, password);
    }
    @PostMapping("/signin")
    public @ResponseBody Boolean checkuser(@RequestParam String email,@RequestParam String password){
        return uc.checkuser(email, password);
    }

}
