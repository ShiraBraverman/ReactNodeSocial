import React from 'react';
import { useNavigate } from 'react-router-dom';

const Album = ({ album, searchCriteria }) => {
  const navigate = useNavigate();
  const handleAlbumClick = (() => {
    navigate(`${album.id}/photos`, { state: album });
  });

  return (
    <div>
      {(album.title.toLowerCase().includes(searchCriteria) || album.id.toString().includes(searchCriteria)) &&
        <div key={album.id}>
          <span className='inputItem' onClick={() => handleAlbumClick()}>{album.id}. {album.title}</span>
        </div>}
    </div>
  );
};

export default Album;