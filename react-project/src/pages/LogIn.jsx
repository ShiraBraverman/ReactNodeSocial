import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const logIn = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const { user, setUser } = useContext(UserContext);

    function handleLogin() {
        if (!userName || !password) {
            setLoginError('Please fill in all fields.');
            return;
        }
        let foundUser;
        const url = 'http://localhost:3000/login';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userName,
                password: password
            }) 
        };
        fetch(url, requestOptions)
            .then(response => {
                console.log(response.status)
                console.log(response)
                if (!response.ok) {
                    setLoginError("incorrect password or username");
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    foundUser = data;
                    localStorage.setItem("currentUser", JSON.stringify(foundUser));
                    setUser(foundUser);
                    setUserName("");
                    setPassword("");
                    setLoginError('Registration successful');
                    navigate('/home');
                }
            })
            .catch(error => {
                setLoginError('Error', error);
            });
    };

    return (
        <div className='form'>
            <h2 className="title">Log in</h2><br />
            <input type="userName" className='input' value={userName} placeholder="userName" onChange={(e) => setUserName(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <button className="btnOkLogIn" onClick={handleLogin}>Connect</button><br />
            <Link to="/register" className="link" >Don't have an account? Create account</Link>
            {loginError && <p className='error' style={{ color: loginError == "Registration successful" ? 'green' : "red" }}>{loginError}</p>}
        </div>
    );
}
export default logIn