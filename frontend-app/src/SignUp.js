import './App.css';
import React,{useState} from 'react';
import { useToken } from './auth';
import { useParams } from 'react-router-dom';


function Signup() {
const [data,setData] = useState({
username:"",
password:"",
name:"",
address:"",
phone:"",
email:"",
winery:""
})
const {id} = useParams()

const {username,password, full_name, address, phone, email} = data;

const [token, login, logout, signup] = useToken();

const changeHandler = e => {
setData({...data,[e.target.name]:[e.target.value]});
}
console.log(data)

const submitHandler = e => {
e.preventDefault();
let winery = {id}.id

signup(
    data.username[0], 
    data.password[0],
    data.full_name[0],
    data.address[0],
    data.phone[0],
    data.email[0],
    winery
    )
}

console.log(data);
    return (
            <div className="container">
            <form onSubmit={submitHandler}>
                <h3>Register</h3>

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
                    <label>Name</label>
                    <input className="form-control" 
                        type="text"
                        name="full_name" 
                        value={full_name}
                        onChange={changeHandler}
                        placeholder="Enter Full Name"
                        required />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input className="form-control" 
                        type="text" 
                        name="address"
                        value={address}
                        onChange={changeHandler}
                        placeholder="Enter Address"
                        required />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input className="form-control" 
                        type="text" 
                        name="phone"
                        value={phone}
                        onChange={changeHandler}
                        placeholder="Enter Phone Number"
                        required />
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

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href={`wineries/${id}/login/`}>log in?</a>
                </p>
            </form>
            </div>
        );
}


export default Signup
