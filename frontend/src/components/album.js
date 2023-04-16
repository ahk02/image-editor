import React, { useState } from 'react';

function Album() {
    const [sourceAlbumName, setSourceAlbumName] = useState('');
    const [destinationAlbumName, setDestinationAlbumName] = useState('');
    const [imageName, setImageName] = useState('');
    const [newAlbumName, setNewAlbumName] = useState('');
    const user = "defaultUser"

    const handleImgMoveSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append("source", sourceAlbumName)
        formData.append("dest", destinationAlbumName)
        formData.append("imageName", imageName)
        formData.append("username", user)
        const res = await fetch('http://localhost:8080/album/moveImg', {
            method: "POST",
            body: formData
        })
        const text = await res.text()
        console.log(text)
    }

    const handleNewAlbumSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append("albumName", newAlbumName)
        formData.append("username", user)
        const res = await fetch('http://localhost:8080/album/newAlbum', {
            method: "POST",
            body: formData
        })
        const text = await res.text()
        console.log(text)
    }

    return (
        <div className="max-w-md mx-auto my-4 p-4 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-medium mb-2">Move an Image</h2>
            <form onSubmit={handleImgMoveSubmit}>
                <div className="mb-2">
                    <label htmlFor="sourceAlbumName" className="block text-gray-700 font-medium mb-1">Source Album Name:</label>
                    <input
                        type="text"
                        id="sourceAlbumName"
                        name="sourceAlbumName"
                        value={sourceAlbumName}
                        onChange={(event) => setSourceAlbumName(event.target.value)}
                        className="border border-gray-400 p-2 rounded-md w-full"
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="destinationAlbumName" className="block text-gray-700 font-medium mb-1">Destination Album Name:</label>
                    <input
                        type="text"
                        id="destinationAlbumName"
                        name="destinationAlbumName"
                        value={destinationAlbumName}
                        onChange={(event) => setDestinationAlbumName(event.target.value)}
                        className="border border-gray-400 p-2 rounded-md w-full"
                    />
                </div>

                <div className="mb-2">
                    <label htmlFor="imageName" className="block text-gray-700 font-medium mb-1">Image Name:</label>
                    <input
                        type="text"
                        id="imageName"
                        name="imageName"
                        value={imageName}
                        onChange={(event) => setImageName(event.target.value)}
                        className="border border-gray-400 p-2 rounded-md w-full"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Move Image</button>
            </form>

            <h2 className="text-lg font-medium mt-4 mb-2">Create a New Album</h2>
            <form onSubmit={handleNewAlbumSubmit}>
                <div className="mb-2">
                    <label htmlFor="newAlbumName" className="block text-gray-700 font-medium mb-1">Album Name:</label>
                    <input
                        type="text"
                        id="newAlbumName"
                        name="newAlbumName"
                        value={newAlbumName}
                        onChange={(event) => setNewAlbumName(event.target.value)}
                        className="border border-gray-400 p-2 rounded-md w-full"
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">Create Album</button>
            </form>
        </div>
    );
}
export default Album;      