import React, { useContext, useEffect } from 'react'
import { Routes, Route, Link, Outlet } from "react-router-dom"
import { UserContext } from '../App';


import Info from './Info'
import Logout from './Logout'
import Todos from './TodosList'
import PostsList from './PostsList';
import Comments from './Comments';
import AlbumsList from './AlbumsList';
import Photos from './Photos';

const HomeNav = ({ setCurrentPage }) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      setUser(storedUser);
    }
  }, [user])

  return (
    <div>
      {user != null && <div>
        <nav>
          <Link to={`users/${user.id}/info`}>Info</Link>
          <Link to={`users/${user.id}/todos`}>Todos</Link>
          <Link to={`users/${user.id}/posts`}>Posts</Link>
          <Link to={`users/${user.id}/albums`} >Albums</Link>
          <Link to={`users/${user.id}/logout`} >Logout</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1 className='welcome'>Welcome to {user.username}</h1>} />
          <Route path="users/:id/info" element={<Info user={user} setCurrentPage={setCurrentPage} />} />
          <Route path="users/:id/todos" element={<Todos userId={user.id} setCurrentPage={setCurrentPage} />} />
          <Route path="users/:id/todos/:todoId" element={<Todos userId={user.id} setCurrentPage={setCurrentPage} />} />
          <Route path="users/:id/posts" element={<PostsList userId={user.id} setCurrentPage={setCurrentPage} />} />
          <Route path="users/:id/posts/:postId/" element={<PostsList userId={user.id} userEmail={user.email} setCurrentPage={setCurrentPage} />}>
            <Route path="comments" element={<Comments userEmail={user.email} setCurrentPage={setCurrentPage} />} />
            <Route path="comments/:commentId" element={<Comments userEmail={user.email} setCurrentPage={setCurrentPage} />} />
          </Route>
          <Route path="users/:id/albums/" element={<Outlet />} >
            <Route index element={<AlbumsList userId={user.id} setCurrentPage={setCurrentPage} />} />
            <Route path=":albumId/photos" element={<Photos setCurrentPage={setCurrentPage} />} />
          </Route>
          <Route path="users/:id/logout" element={<Logout setUser={setUser} setCurrentPage={setCurrentPage} />} />
        </Routes>
      </div>
      }
    </div>
  )
}

export default HomeNav