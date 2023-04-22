package com.example.ImageEditor;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User,String> {
    User findByEmail(String email);
}
