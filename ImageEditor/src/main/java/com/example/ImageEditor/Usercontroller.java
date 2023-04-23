package com.example.ImageEditor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Usercontroller implements UserControllerInterface {
    @Autowired
    private UserRepository ur;

    public String base(){
        return "user controller running";
    }

    public String adduser(String email, String password){
        ur.save(new User(email,email,password));
        return "Successfully signed up";
    }

    public Boolean checkuser(String email, String password){
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
