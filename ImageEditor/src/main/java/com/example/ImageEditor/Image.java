package com.example.ImageEditor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("userimages")
public class Image {
    @Id
    private String id;
    private String user;
    private String imgname;
    private String source;

    public Image(String id, String user, String imgname, String source) {
        this.id = id;
        this.user = user;
        this.imgname = imgname;
        this.source = source;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getImgname() {
        return imgname;
    }

    public void setImgname(String imgname) {
        this.imgname = imgname;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
