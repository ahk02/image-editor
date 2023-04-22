package com.example.ImageEditor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


public class AlbumExistsChecker extends ExistsChecker {
    @Autowired
    private AlbumRepository albumRepository;

    public AlbumExistsChecker(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    @Override
    public AlbumsAndImage check(String username, String album1, String album2,
                                String imageName, AlbumsAndImage ob) {
        List<Album> albums = albumRepository.findByCreator(username);
        Album album = null;
        for (Album a : albums) {
            if (Objects.equals(a.getName(), album1)) {
                album = a;
                break;
            }
        }
        if (album == null) {
            return ob;
        }
        else {
            ob.addAlbum(album);
            return this.getNextChecker().check(username, album2, null, imageName, ob);
        }
    }
}
