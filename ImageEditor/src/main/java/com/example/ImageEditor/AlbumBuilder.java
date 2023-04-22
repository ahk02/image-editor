package com.example.ImageEditor;

import java.util.ArrayList;
import java.util.List;

public class AlbumBuilder {
    private String id;
    private String name;
    private String creator;
    private List<Image> images;
    private String path;

    public AlbumBuilder() {
        this.path = "";
    }

    public AlbumBuilder setId(String id) {
        this.id = id;
        return this;
    }

    public AlbumBuilder setName(String name) {
        this.name = name;
        return this;
    }

    public AlbumBuilder setCreator(String creator) {
        this.creator = creator;
        return this;
    }

    public AlbumBuilder createImageList() {
        this.images = new ArrayList<>();
        return this;
    }

    public AlbumBuilder setPath(String path) {
        this.path = path;
        return this;
    }

    public Album build() {
        Album album = new Album();
        album.setId(this.id);
        album.setName(this.name);
        album.setCreator(this.creator);
        album.setImages(this.images);
        album.setPath(this.path);
        return album;
    }
}

