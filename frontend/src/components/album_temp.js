import { useState, useEffect } from 'react';

function AlbumList() {
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
      setAlbums([... json ])
    }
    makeGetAlbumsRequest()
  }, []);

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
        setImages([... json]) 
      }
    }
    getImagesFromBacked()
  }, [selectedAlbum]);

  const handleAlbumChange = (event) => {
    setSelectedAlbum(event.target.value);
  };

  const handleDeleteImage = (image) => {
    const sendDeleteImageRequest = async () => {
      const formData = new FormData()
        formData.append("albumName", selectedAlbum)
        formData.append("imgName", image)
        formData.append("username", localStorage.user)

        const res = await fetch('http://localhost:8080/album/deleteImg', {
          method: "POST",
          body: formData
        })
        console.log(res)
        const newImages = images.filter((img) => {
          if (img != image) {
            return img
          }
        })
        setImages(newImages)
    }
    sendDeleteImageRequest()
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <label htmlFor="album-select" className="block font-medium mb-2">Select an album:</label>
        <select id="album-select" value={selectedAlbum} onChange={handleAlbumChange} className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg">
          <option value="">--Please choose an album--</option>
          {albums && albums.map((album, index) => (
            <option key={index} value={album}>{album}</option>
          ))}
        </select>
        {images.length > 0 && (
          <div>
            <p className="mb-2">Images in {selectedAlbum}:</p>
            <ul className="list-disc pl-4">
              {images.map((image, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{image}</span>
                  <div className='grid grid-flow-col gap-2'>
                    <button onClick={() => handleDeleteImage(image)} className="px-3 py-2 bg-red-500 text-white rounded-lg">Delete</button>
                    <button className="px-3 py-2 bg-red-500 text-white rounded-lg">Edit</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlbumList;