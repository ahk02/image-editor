package com.example.ImageEditor;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AlbumRepository extends MongoRepository<Album, String> {
    public List<Album> findByName(String name);
    public List<Album> findByCreator(String creator);
}
