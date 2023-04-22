package com.example.ImageEditor;

public abstract class ExistsChecker {
    protected ExistsChecker nextChecker;

    public ExistsChecker getNextChecker() {
        return nextChecker;
    }

    public void setNextChecker(ExistsChecker nextChecker) {
        this.nextChecker = nextChecker;
    }
    public abstract AlbumsAndImage check(String username, String album1, String album2, String imageName, AlbumsAndImage ob);
}
