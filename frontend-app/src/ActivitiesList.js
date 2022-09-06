import { useEffect } from "react";
import { useState } from "react";
import {AddActivities} from "./Components/AddActivityToList";
// import {getUserInfo} from "./Authorization.js"
// // import {useAuthContext} from "./Authorization.js"
// import {useToken} from "./Authorization.js"


function FetchActivities(){
    const [activities, setActivitiesData] = useState([])
    const [error, setError] = useState("")
    const [userid, setUserId]= useState(4)
    // const [isVisible, setIsVisible] = useState(true)
    const [userData, setUserdata]= useState({})
    const [token, setToken] = useState({})

  
    useEffect(()=> {
        const getActivityData = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/activities/`;
            const response = await fetch(url);
            if(response.ok){
                const data = await response.json()
                setActivitiesData(data["Activities"])
            } else {
                setError("Could not load the activities, try again")
            }
        }
        const getUserdata = async () => {
            //get userdata and store in state 
            // from fetch call using userid in token
        }

        // getUserInfo().then(setUserId(getUserInfo()))
        // // console.log("id", getUserInfo().then(setUserId))
        
        getActivityData()
        // setUserId(getUserInfo().id)
        // console.log("token", token)
        
    }, [])
   
    console.log("this is the getuserinfo function", userid)
    
   

    // console.log(getUserInfo)
    return (
        <main>
            <div className="px-9 text-center display-6 fw-bold " >
                <h1 className="display-5 fw-bold light_padding">Click to add your favorite Activities!</h1>
            </div>
            <div className="row">
                {/* {activities.filter(favAct => {
                    if(!(favAct in user.id.favorite_activities)){
                        return favAct
                    }
                }) */}

                {/* take off activities on line 64 and bring 61 down */}
                {activities.map(activity => {
                    return (
                        // onClick={handleClick} needs to go inside of the other onclick was in 68
                        // style={{visibility: isVisible? 'visible' : 'hidden'}}
                        //need to find a way to either add fav activities to that user token 
                        //or make a call using that usertoken store user 
                        <div className="col-sm-3" key={activity.id} >
                            <div  className="card mb-3 shadow"  >
                                <div onClick={ () => {AddActivities (userid, activity)}}>
                                    <img src={activity.picture_url} className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title">{activity.name}</h5>
                                        </div>
                        
                                </div>
                            </div>
                        </div>
                    );
                })}
            
            </div>
        </main>
      )      
}
export default FetchActivities