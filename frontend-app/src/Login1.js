// import './App.css';
import React,{useState} from 'react';
import { useToken } from './auth';
import { useParams } from 'react-router-dom';


function Login() {
const [data,setData] = useState({
username:"",
password:""
})

const {username,password} = data;
const {id} = useParams()

const [token,login] = useToken();

const changeHandler = e => {
setData({...data,[e.target.name]:[e.target.value]});
}
console.log(data)

const submitHandler = e => {
e.preventDefault();
login(data.username[0], data.password[0],{id}.id)
console.log(data);
}
return (
    <div className="wrapper fadeInDown">
        <div id="formContent">
            <div className="fadeIn first">
            </div>
            <form>
                <input type="text" id="username" className="fadeIn second" name="login" placeholder="Enter Username" />
                <input type="text" id="password" className="fadeIn third" name="login" placeholder="Enter Password" />
                <input type="submit" className="fadeIn fourth" value="Sign In" />
            </form>
        </div>
    </div>
);
}

export default Login;
