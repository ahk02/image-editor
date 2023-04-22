package com.example.ImageEditor;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("userlogin")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    public User(String id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }
}
