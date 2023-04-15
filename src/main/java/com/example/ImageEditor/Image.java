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
}
