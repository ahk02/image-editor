package com.example.ImageEditor;

public interface UserControllerInterface {
    public String base();

    public String adduser(String email, String password);

    public Boolean checkuser(String email, String password);
}
