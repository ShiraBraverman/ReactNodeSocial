import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({setUser, setCurrentPage }) => {
  const navigate = useNavigate();

  const handleLogout = (logout) => {
    if (logout) {
      setCurrentPage('login')
      localStorage.removeItem('currentUser');
      setUser({});
      navigate("/login");
    }
    else{
      navigate("/home");
    }
  };

  return (
    <div className='form'>
      <p>Are you sure you want to logout?</p>
      <button onClick={() => handleLogout(true)}>Yes</button>
      <button onClick={() => handleLogout(false)}>No</button>
    </div>
  );
};

export default Logout;