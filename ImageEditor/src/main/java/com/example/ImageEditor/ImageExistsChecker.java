package com.example.ImageEditor;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;

public class ImageExistsChecker extends ExistsChecker {

    @Override
    public AlbumsAndImage check(String username, String album1, String album2,
                                String imageName, AlbumsAndImage ob) {
        Album sourceAlbum = ob.getAlbumList().get(0);
        Image img = null;
        for(int i = 0 ; i < sourceAlbum.images.size() ; i++){
            if (Objects.equals(sourceAlbum.images.get(i).getImgname(), imageName)) {
                img = sourceAlbum.images.get(i);
                break;
            }
        }
        ob.setImg(img);
        return ob;
    }
}
