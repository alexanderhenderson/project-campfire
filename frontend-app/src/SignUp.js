import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from './Authorization';
// import { useParams } from 'react-router-dom';


function Signup() {
    const [userData, setUserData] = useState({
    username:"",
    password:"",
    first_name:"",
    last_name:"",
    email:"",
    city:"",
    state:""
    })

    const navigate = useNavigate()

    const {username, password, first_name, last_name, email, city, state} = userData;

    const [token, login, logout, signup] = useToken();

    const changeHandler = e => {
    setUserData({...userData, [e.target.name]:[e.target.value]});
    }
    console.log(userData)

    const submitHandler = e => {
    e.preventDefault();

    signup(
        userData.username[0], 
        userData.password[0],
        userData.email[0],
        userData.first_name[0],
        userData.last_name[0],
        userData.city[0],
        userData.state[0],
        )
        
        
    }

    console.log(userData);
        return (
                <div className="container">
                <form onSubmit={submitHandler}>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" 
                            type="text" 
                            value={username}
                            name="username"
                            onChange={changeHandler}
                            placeholder="Enter Username"
                            required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" 
                            type="password"
                            value={password}
                            name="password"
                            onChange={changeHandler}
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" 
                            type="email" 
                            name="email"
                            value={email}
                            onChange={changeHandler}
                            placeholder="Enter Email"
                            required />
                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input className="form-control" 
                            type="text"
                            name="first_name" 
                            value={first_name}
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            required />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input className="form-control" 
                            type="text"
                            name="last_name" 
                            value={last_name}
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            required />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input className="form-control" 
                            type="text" 
                            name="city"
                            value={city}
                            onChange={changeHandler}
                            placeholder="Enter City"
                            required />
                    </div>
                    <div className="form-group pb-2">
                        <label>State</label>
                        <input className="form-control" 
                            type="text" 
                            name="state"
                            value={state}
                            onChange={changeHandler}
                            placeholder="Enter State"
                            required />
                    </div>
                    <div>

                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already Signed Up? <a href={`Login`}>Log In</a>
                    </p>
                </form>
                </div>
            );
}


export default Signup
