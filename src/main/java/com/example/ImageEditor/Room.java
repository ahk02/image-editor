package com.example.ImageEditor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Room")
public class Room {
    @Id
    private Long id;
    private String owner_id;
    private List<String> users;
    private String img;

    public Room() {
    }

    public Room(Long room_id, String owner_id, List<String> users, String img) {
        this.id = room_id;
        this.owner_id = owner_id;
        this.users = users;
        this.img = img;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long room_id) {
        this.id = room_id;
    }
    public String getOwner_id() {
        return owner_id;
    }

    public void setOwner_id(String owner_id) {
        this.owner_id = owner_id;
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
