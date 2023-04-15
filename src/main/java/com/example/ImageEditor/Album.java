package com.example.ImageEditor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("albums")
public class Album{
    @Id
    private String Id;
    private String name;
    private String creator;
    private Image[] images;
    private String path;

}
