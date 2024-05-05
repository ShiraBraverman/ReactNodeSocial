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
        <li><strong>Name:</strong> {user.name}</li>
        <li><strong>Username:</strong> {user.username}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li>
          <strong>Address:</strong>
          <ul>
            <li><strong>Street:</strong> {user.address.street}</li>
            <li><strong>Suite:</strong> {user.address.suite}</li>
            <li><strong>City:</strong> {user.address.city}</li>
            <li><strong>Zipcode:</strong> {user.address.zipcode}</li>
            <li>
              <strong>Geo:</strong>
              <ul>
                <li><strong>Lat:</strong> {user.address.geo.lat}</li>
                <li><strong>Lng:</strong> {user.address.geo.lng}</li>
              </ul>
            </li>
          </ul>
        </li>
        <li><strong>Phone:</strong> {user.phone}</li>
        <li>
          <strong>Company:</strong>
          <ul>
            <li><strong>Name:</strong> {user.company.name}</li>
            <li><strong>Catch Phrase:</strong> {user.company.catchPhrase}</li>
            <li><strong>BS:</strong> {user.company.bs}</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Info;
