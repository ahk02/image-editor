package com.example.ImageEditor;

import java.util.ArrayList;
import java.util.List;

public class AlbumsAndImage {
    private List<Album> albumList;
    private Image img;
    public AlbumsAndImage() {
        this.albumList = new ArrayList<Album>();
        this.img = null;
    }

    public Image getImg() {
        return img;
    }

    public void setImg(Image img) {
        this.img = img;
    }
    public void addAlbum(Album a) {
        this.albumList.add(a);
    }

    public List<Album> getAlbumList() {
        return this.albumList;
    }
}
