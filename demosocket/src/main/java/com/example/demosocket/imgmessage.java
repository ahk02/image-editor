package com.example.demosocket;

public class imgmessage {
    private String user;
    private String room_id;
    private String imgsrc;

    public String getUser() {
        return user;
    }
    public void setUser(String user) {
        this.user = user;
    }

    public String getRoom_id() {
        return room_id;
    }

    public String getImgsrc() {
        return imgsrc;
    }

    public void setRoom_id(String room_id) {
        this.room_id = room_id;
    }
    public void setImgsrc(String imgsrc) {
        this.imgsrc = imgsrc;
    }
}
