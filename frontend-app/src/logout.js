import React from 'react';
import { useState } from 'react';
import { useToken } from './Authorization';


export default function LogOut() {
    // eslint-disable-next-line no-unused-vars
    const [token, login, logout] = useToken();
    // eslint-disable-next-line no-unused-vars
    const [logoutResponse, setLogoutResponse] = useState();

    async function onSubmit(){

      
      //console.log("Submitted");
      //console.log("Submitted, token: ", token);
      
      const result = await logout();
      //console.log(result);
      setLogoutResponse(result);
      //console.log("logout response: ", logoutResponse);
    }

  return(
    <div className="container px-4 py-4 text-center">
      <div className="row gx-5">
        <div className="col">
          <div className="card shadow">
            <div className = "card body px-4 py-4">
              <form>
                <h1> Log Out </h1>
                <button type="button" className="btn btn-primary" onClick={onSubmit}>Log Out</button>
              </form>
              {/* <p className="fs-5" hidden={ (loginResponse !== undefined) ? false : true }> {loginResponse} </p>               */}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}