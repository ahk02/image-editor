package com.example.ImageEditor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("albums")
public class Album{
    @Id
    private String id;
    private String name;
    private String creator;
    public List<Image> images;
    private String path;

    public Album() {
    }

    public Album(String name, String creator, List<Image> images, String path) {
        this.name = name;
        this.creator = creator;
        this.images = images;
        this.path = path;
    }

    public Album(String id, String name, String creator, List<Image> images, String path) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.images = images;
        this.path = path;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "Album{" +
                "Id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", creator='" + creator + '\'' +
                ", images=" + images +
                ", path='" + path + '\'' +
                '}';
    }
}
