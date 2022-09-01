import './App.css';
import React,{useState} from 'react';
import { useToken } from './auth';
import { useParams } from 'react-router-dom';


function Signup() {
    const [data, setData] = useState({
    username:"",
    password:"",
    first_name:"",
    last_name:"",
    email:"",
    city:"",
    state:""
    })

    const {username, password, first_name, last_name, email, city, state} = data;

    const [token, login, logout, signup] = useToken();

    const changeHandler = e => {
    setData({...data, [e.target.name]:[e.target.value]});
    }
    console.log(data)

    const submitHandler = e => {
    e.preventDefault();

    signup(
        data.username[0], 
        data.password[0],
        data.email[0],
        data.first_name[0],
        data.last_name[0],
        data.address[0],
        data.city[0],
        data.state[0],
        )
    }

    console.log(data);
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
                    <div className="form-group">
                        <label>State</label>
                        <input className="form-control" 
                            type="text" 
                            name="state"
                            value={state}
                            onChange={changeHandler}
                            placeholder="Enter State"
                            required />
                    </div>


                    <button type="submit" className="btn btn-dark btn-lg btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <a href={`User/Login`}>Log In?</a>
                    </p>
                </form>
                </div>
            );
}


export default Signup
