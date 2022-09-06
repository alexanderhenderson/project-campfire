import React from 'react';
import { useState } from 'react';
import { useToken } from './Authorization';


// import { getUserInfo } from './Authorization'; // testing don't leave in imports

export default function LogIn() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, login] = useToken();
  const [loginResponse, setLoginResponse] = useState();
  



    async function onSubmit(){

      //console.log("Submitted, token: ", token)

      //console.log("function: ", login);
      
      const result = await login(username, password);
      setLoginResponse(result);

      // ---- Testing -- don't leave stuff below here for final production
      
      const UserInfoRequest = await fetch(`${process.env.REACT_APP_USERS}/users/api/tokens/user/`, {
        credentials: "include",
      });
      console.log(await UserInfoRequest);
      const data = await UserInfoRequest.json()
      console.log("User Data: ", await data);
      console.log("User: ", await data.username);
      console.log("User ID: ", await data.id);
    

      // console.log("User array: ", getUserInfo())
      // console.log("Username: ", getUserInfo().username)
      // console.log("User ID: ", getUserInfo().id)

      // ---- don't leave stuff above here


      if (result == null) {
        setUsername("");
        setPassword("");
      };

    }

  return(
    <div className="container px-4 py-4 text-center">
      <div className="row gx-5">
        <div className="col">
          <div className="card shadow">
            <div className = "card body px-4 py-4">
              <form>
                <h1> Log in </h1>
                <div className="form-floating mb-3">
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)} id="username" className="form-control"/>
                  <label htmlFor="username"> Username </label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" className="form-control"/>
                  <label htmlFor="password"> Password </label>
                </div>
                <p className="fs-5" hidden={ (loginResponse !== undefined) ? false : true }> 
                  Incorrect Username or Password
                </p> 
                <button type="button" className="btn btn-success" onClick={onSubmit}>Test User Info Fetch + Log in</button>
              </form>         
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}