package com.example.ImageEditor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/image")
@CrossOrigin
public class Imagecontroller {
    @Autowired
    private Imagerepository ir;
    @GetMapping
    public  @ResponseBody String getserver(){
        return "image controller working";
    }
    @PostMapping("/add")
    public @ResponseBody String addimage(@RequestParam String id,@RequestParam String user,@RequestParam String imgname, @RequestParam String source )
    {
        Image img = new Image(id,user,imgname,source);
        ir.save(img);
        return "success";
    }
}
