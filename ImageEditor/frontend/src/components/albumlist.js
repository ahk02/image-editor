import { useState, useEffect } from 'react';
import Singlealbum from './singlealbum';

function AlbumList(props) {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const makeGetAlbumsRequest = async () => {
      const formData = new FormData()
      formData.append("creator", localStorage.user)
      const res = await fetch('http://localhost:8080/album/getalbums', {
        method: "POST",
        body: formData
      })
      const json = await res.json()
      setAlbums([...json])
    }
    makeGetAlbumsRequest()
  }, [props.ren]);

  useEffect(() => {
    const getImagesFromBacked = async () => {
      if (selectedAlbum != '') {
        const formData = new FormData()
        formData.append("albumName", selectedAlbum)
        formData.append("creator", localStorage.user)
        const res = await fetch('http://localhost:8080/album/getimages', {
          method: "POST",
          body: formData
        })
        const json = await res.json()
        setImages([...json])
      }
    }
    getImagesFromBacked()
  }, [selectedAlbum]);


  return (
    <div className="bg-gray-100 mt-2">
      {albums && albums.map((n) => (
        <Singlealbum key={n} name={n} />
      ))}
    </div>
  );
}

export default AlbumList;