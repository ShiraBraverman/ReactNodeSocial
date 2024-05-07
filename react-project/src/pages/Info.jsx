import React, { useEffect, useState } from 'react';

const Info = ({ user, setCurrentPage }) => {
  useEffect(() => {
    setCurrentPage('info')
    console.log('info');
  }
    , [])
  return (
    <div className='info'>
      <h2>User Details</h2>
      <ul>
        <li><strong>ID:</strong> {user.id}</li>
        <li><strong>Username:</strong> {user.username}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Phone:</strong> {user.phone}</li>
      </ul>
    </div>
  )
}

export default Info;
