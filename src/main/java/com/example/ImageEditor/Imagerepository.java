package com.example.ImageEditor;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface Imagerepository extends MongoRepository<Image,String> {
}
