import React from 'react';
import { useState } from 'react';
import { useToken } from './Authorization';
import { useEffect } from 'react';


// import { getUserInfo } from './Authorization'; // testing don't leave in imports

export default function MemberMatcher() {
  
  const [username, setUsername] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(()=> {

    const url = `${process.env.REACT_APP_USERS}/users/`
    const userFetch = fetch (url, {
      credentials: "include",
      }).then(response => response.json()).then(data => {
        console.log("Promise Chain Data loaded: ", data); 
        setUserList(data);
        console.log("State userlist: ", userList) 
        return null
      })


        console.log("Userlist state: ", userList)
        console.log("Userfetch test: ", userFetch)

      const UserInfoRequest = async () => { 
        const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`
        const response  = await fetch(url ,
          {credentials: "include"}
        );
        
        if (response.ok) {
          const data = await response.json()
          console.log("data: ", data.username)
          setUsername(data.username)
          // setUsername(data['username'])
        };
      }

      // const UserListRequest = async() => {
      //   const url = `${process.env.REACT_APP_USERS}/users/`

      //   const userFetch = fetch (url, {
      //     credentials: "include",
      //   }).then(response => response.json()).then(data => setUserList(data))

      //   console.log("Userlist state: ", userList)
      //   console.log("Userfetch test: ", userFetch)

      //   // response
      //   // .then( (response) => 
      //   // {console.log("test"); const data = response.json(); return data;}
      //   // successValue(result) {
      //   //   console.log(result);
      //   // })
          
      //   //   .then( (data) => {console.log("Promise chain working?: ", data); return null;} )

      // }

    

      UserInfoRequest()
      //UserListRequest()
    }, [])

    async function onSubmit(){
    }

  return(
    <div className="container px-4 py-4 text-center">
      <div className="row gx-5">
        <div className="col">
          <div className="card shadow">
            <div className = "card body px-4 py-4">
                <h1> { username || "loading" } is logged in </h1>
                <h1> { userList?.users?.[0].id || " loading " } - </h1>
                <table>
                  <tr>
                    <td>
                      fart
                    
                    </td>
                    <td>
                      fart 2 
                    </td>
                  </tr>
                </table>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}