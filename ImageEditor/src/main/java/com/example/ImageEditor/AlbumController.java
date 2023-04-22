package com.example.ImageEditor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Controller
@RequestMapping("/album")
@CrossOrigin
public class AlbumController {
    @Autowired
    private AlbumRepository albumRepository;

    @PostMapping("/moveImg")
    public @ResponseBody String moveImg(@RequestParam String source, @RequestParam String dest, @RequestParam String imageName, @RequestParam String username) {

        AlbumsAndImage albumsAndImage = new AlbumsAndImage();
        ExistsChecker checker = new AlbumExistsChecker(albumRepository);
        ExistsChecker checker1 = new AlbumExistsChecker(albumRepository);
        checker.setNextChecker(checker1);
        ExistsChecker checker2 = new ImageExistsChecker();
        checker1.setNextChecker(checker2);

        AlbumsAndImage res = checker.check(username, source, dest, imageName, albumsAndImage);

        Album sourceAlbum = null;
        Album destAlbum = null;
        Image img = res.getImg();

        if (res.getAlbumList().size() == 0) {
            return "invalid source album";
        }
        else {
            sourceAlbum = res.getAlbumList().get(0);
            if (res.getAlbumList().size() == 1) {
                return "invalid destination album";
            }
            else {
                destAlbum = res.getAlbumList().get(1);
                if (img == null) {
                    return "invalid image name";
                }
                else {
                    // code to remove image from sourceAlbum's images
                    sourceAlbum.images.remove(img);
                    // code to add image to destAlbum's images
                    destAlbum.images.add(img);

                    albumRepository.save(sourceAlbum);
                    albumRepository.save(destAlbum);
                    return "success";
                }
            }
        }

        //
        /*
        List<Album> albums = albumRepository.findByCreator(username);
        boolean validSource = false;
        Album sourceAlbum = null;
        for (Album a : albums) {
            if (Objects.equals(a.getName(), source)) {
                sourceAlbum = a;
                validSource = true;
            }
        }
        if (!validSource) {
            return "invalid source album";
        }

        Album destAlbum = null;
        boolean validDest = false;
        for (Album a : albums) {
            if (Objects.equals(a.getName(), dest)) {
                destAlbum = a;
                validDest = true;
            }
        }
        if (!validDest) {
            return "invalid destination album";
        }

        boolean foundImage = false;
        Image img = null;
        for(int i = 0 ; i < sourceAlbum.images.size() ; i++){
            if (Objects.equals(sourceAlbum.images.get(i).getImgname(), imageName)) {
                img = sourceAlbum.images.get(i);
                foundImage = true;
                break;
            }
        }
        if (!foundImage) {
            return "invalid image name";
        }

        // code to remove image from sourceAlbum's images
        sourceAlbum.images.remove(img);
        // code to add image to destAlbum's images
        destAlbum.images.add(img);

        albumRepository.save(sourceAlbum);
        albumRepository.save(destAlbum);
        return "success";

         */
    }

    @PostMapping("/newAlbum")
    public @ResponseBody String createNewAlbum(@RequestParam String albumName, @RequestParam String username) {
        List<Album> albums = albumRepository.findByCreator(username);
        boolean duplicateName = false;
        for (Album a : albums) {
            if (Objects.equals(a.getName(), albumName)) {
                duplicateName = true;
                break;
            }
        }
        if (duplicateName) {
            return "album already exists";
        }
        Album newAlbum = new AlbumBuilder()
                .setId(username + "/" + albumName)
                .setName(albumName)
                .setCreator(username)
                .createImageList()
                .setPath("")
                .build();
        albumRepository.save(newAlbum);
//        System.out.println(newAlbum.toString());
        return "success";
    }
    @PostMapping("/addimage")
    public @ResponseBody String addImage(@RequestParam String albumname,@RequestParam String username,@RequestParam String imgname , @RequestParam String source)
    {
        List<Album> albums = albumRepository.findByCreator(username);
        System.out.println(albums.size());
        Album curralbum=null;
        for (Album a : albums) {
            System.out.println(a.toString());
            if (Objects.equals(a.getName(), albumname)) {
                curralbum=a;
                break;
            }
        }
        if(curralbum==null)
            return "album doesnt exist";
        Image currimage= new Image(username+"/"+imgname,username,imgname,source);
        curralbum.images.add(currimage);
        albumRepository.save(curralbum);
        return "success";
    }
    @PostMapping("/getalbums")
    public @ResponseBody List<String> getAlbums(@RequestParam String creator)
    {
        List<Album> a=albumRepository.findByCreator(creator);
        List<String> aNames = new ArrayList<>() ;
        for(Album i : a){
            aNames.add(i.getName());
        }
        return aNames;
    }

    @PostMapping("/deleteImg")
    public @ResponseBody String deleteImg(@RequestParam String albumName, @RequestParam String imgName, @RequestParam String username) {
        List<Album> albums=albumRepository.findByCreator(username);
        Album album = null;
        for (Album a : albums) {
            if (Objects.equals(a.getName(), albumName)) {
                album = a;
                break;
            }
        }
        if (album == null) {
            return "invalid album name";
        }

        Image img = null;
        for (Image i : album.images) {
            if (Objects.equals(i.getImgname(), imgName)) {
                img = i;
                break;
            }
        }
        if (img == null) {
            return "invalid image name";
        }
        album.images.remove(img);
        albumRepository.save(album);
        return "success";
    }

    @PostMapping("/getimages")
    public @ResponseBody List<Image> getImages(@RequestParam String albumName, @RequestParam String creator) {
        List<Album> albums=albumRepository.findByCreator(creator);
        Album album = null;
        for (Album a : albums) {
            if (Objects.equals(a.getName(), albumName)) {
                album = a;
                break;
            }
        }
        List<Image> images = new ArrayList<>();
        for (Image i : album.images) {
            images.add(i);
        }
        return images;
    }
}
