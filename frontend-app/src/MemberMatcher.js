import React from 'react';
import { useState } from 'react';
import { useToken } from './Authorization';
import { useEffect } from 'react';



// import { getUserInfo } from './Authorization'; // testing don't leave in imports


// its a match!


export default function MemberMatcher() {
  
  const [username, setUsername] = useState('');
  const [userList, setUserList] = useState([]);
  const [KindlerList, SetKindlerData] = useState([]);

  useEffect(()=> {

    // const url = `${process.env.REACT_APP_USERS}/users/`
    // const userFetch = fetch (url, {
    //   credentials: "include",
    //   }).then(response => response.json()).then(data => {
    //     console.log("Promise Chain Data loaded: ", data); 
    //     setUserList(data);
    //     console.log("State userlist?: ", userList) 
    //     return null
    //   })


        // console.log("Userlist state: ", userList)
        // console.log("Userfetch test: ", userFetch)

      const UserInfoRequest = async () => { 
        const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`
        const response  = await fetch(url ,
          {credentials: "include"}
        );
        
        if (response.ok) {
          const data = await response.json()
          console.log("Logged in user data: ", data)
          setUsername(data)
        };
      }

      const KindlerData = async () => { 
        const url = `${process.env.REACT_APP_USERS}/users/api/kindler`
        const response  = await fetch(url ,
          {credentials: "include"}
        );
        
        if (response.ok) {
          const data = await response.json()
          console.log("kindler data: ", data)
          SetKindlerData(data)
          console.log("Userdata: ", username)
        };
      }

      UserInfoRequest()
      KindlerData()
      //UserListRequest()
    }, [])

    // <h1> { username || "loading" } is logged in </h1>
    // <h1> { userList?.users?.[0].id || " loading " } - </h1>

    async function onSubmit(){
    }

  return(
    <div>
    <img className="mw-100" src="/bestMountains.png" alt="Max-width 100%"></img>
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Campfire</h1>
      <div className="col-lg-6 mx-auto">
        <div className="lead mb-4">
          Gather around the campfire with new friends
        </div>
      </div>
      <div><small>Find your tribe</small></div>
      <div className="row">
      {KindlerList.map(KindlerUser => {
        return (
          <div className="col-sm-4" key={KindlerUser.id}>
            <div className="card mb-3 shadow h-100">
              <img className="kindle-card" src={KindlerUser?.profile_photo || 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHPJFBrPoazCA8scTIXSLI6fwQHWFI-VhSkQ&usqp=CAU" 
                }  />
                {/* className="card-img-top" */}
              <div className="card-body">
                <h5 className="card-title">{KindlerUser.username}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {/* {KindlerUser?.favorite_activities?.[0]} */}
                  Test
                </h6>
                <p className="card-text">
                  {KindlerUser.email}
                </p>
              </div>
              <div className="card-footer">
                {KindlerUser.city}
                 -
                {KindlerUser.state}
             </div>
            </div> 
          </div> 
          ); 
        })} 
      </div>
      </div>
      </div>
  )
};