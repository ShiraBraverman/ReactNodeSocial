import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Photo from '../components/Photo';

const Photos = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { title, id } = state || {};  
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMorePhotos, setHasMorePhotos] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: '', url: '' });

  let message;
  
  useEffect(() => {
    loadMorePhotos(0, true);
  }, []);

  const loadMorePhotos = (pageToLoad, reset = false) => {
    setLoading(true);
    const url = `http://localhost:3000/photos?albumId=${id}&_page=${pageToLoad}&_limit=10`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length < 10) {
          setHasMorePhotos(false);
        } else {
          setHasMorePhotos(true);
        }
        setPhotos(prevPhotos => reset ? data : [...prevPhotos, ...data]);
        setPage(pageToLoad + 1);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading photos:', error);
        setLoading(false);
      });
  };

  const addPhoto = () => {
    if (newPhoto.url === '' || newPhoto.title === '') {
      return;
    }
    const newPhotoObject = {
      albumId: id,
      title: newPhoto.title,
      url: newPhoto.url,
      thumbnailUrl: newPhoto.url
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPhotoObject),
    };
    fetch(`http://localhost:3000/photos`, requestOptions)
      .then(res => res.json())
      .then(data => {
        setIsAddingPhoto(false);
        setNewPhoto({ title: '', url: '' });
        setPage(0);
        setPhotos([]);
        loadMorePhotos(0, true);
      })
      .catch(error => {
        console.error('Error adding photo:', error);
      });
  };

  const backToAlbums = () => {
    navigate(`../`);
  };

  if (photos.length === 0) {
    message = <h1>No photos found.</h1>;
  }

  const handleChange = (field, value) => {
    setNewPhoto(prevDetails => ({
      ...prevDetails,
      [field]: value,
      thumbnailUrl: prevDetails.url.replace("/600/", "/150/")
    }));
  };

  return (
    <div className="photos-container">
      {message}
      <button onClick={backToAlbums}>Back to All Albums</button>
      <button className='add-photo-button' onClick={() => { setIsAddingPhoto(!isAddingPhoto); setNewPhoto({ url: '', title: '' }); }}>➕ Add Photo</button>
      {isAddingPhoto && (
        <div className='add-photo-form'>
          <input type="text" value={newPhoto.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Enter title of photo" />
          <input type="text" value={newPhoto.url} onChange={(e) => handleChange('url', e.target.value)} placeholder="Enter url of photo" />
          <button onClick={addPhoto}>Add Photo</button>
        </div>
      )}
      <div className='photo-list'>
        {photos.map(photo => (
          <Photo key={photo.id} photo={photo} photos={photos} setPhotos={setPhotos} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {hasMorePhotos && !loading ? (
        <button onClick={() => loadMorePhotos(page)}>View more</button>
      ) : !loading && <div>No more photos</div>}
    </div>
  );
};

export default Photos;
