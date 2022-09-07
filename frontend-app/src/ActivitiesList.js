import { useEffect } from "react";
import { useState } from "react";
import {AddActivities} from "./Components/AddActivityToList";

function FetchActivities(){
    const [activities, setActivitiesData] = useState([])
    const [userData, setUserId]= useState("")
    const [activityList, setActivityList] = useState([])

    useEffect(()=> {
        //promise Chain cool! 
        // const userFetch = fetch (`${process.env.REACT_APP_USERS}/users/api/tokens/user/`, {
        //     credentials: "include",
        //   }).then(response => response.json()).then(data => setUserId(data.id))
        
        const getActivityData = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/activities/`;
            const response = await fetch(url);
            if(response.ok){
                const data = await response.json()
                setActivitiesData(data["Activities"])
            } 
        }

        const getUserdata = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`;
            const response = await fetch(url, {credentials : "include"});
            if (response.ok){
                const userData = await response.json()
                setUserId(userData)
                setActivityList(userData.favorite_activities)
            }
        }

        getActivityData()
        getUserdata()
        
    }, [activityList])
    
    const userFavesIds = activityList.map(act => act.id)
   
    return (
        <main>
            <div className="px-9 text-center display-6 fw-bold " >
                <h1 className="display-5 fw-bold light_padding">Click to add your favorite Activities!</h1>
            </div>
            <div className="row ">
                {activities.filter(act => !userFavesIds.includes(act.id))
                .map(activity => {
                    return (
                        <div className="col-sm-3" key={activity.id} >
                            <div  className="card mb-3 shadow pointer"  >
                                <div onClick={ () => {AddActivities(userData.id, activity)}}>
                                    <img src={activity.picture_url} className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title center_card_text">{activity.name}</h5>
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
export default FetchActivities;
