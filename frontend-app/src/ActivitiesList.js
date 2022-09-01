import { useEffect } from "react";
import { useState } from "react";
import {AddActivities} from "./Components/AddActivityToList";

function FetchActivities(){
    const [activities, setActivitiesData] = useState([])
    const [error, setError] = useState("")

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
        getActivityData()
    }, [setActivitiesData,setError])
    const userid = 3 
    return (
        <main>
            <div className="px-9 text-center display-6 fw-bold " >
                    <h1 className="display-5 fw-bold light_padding">Click to add your favorite Activities!</h1>
            </div>
            <div className="row">
            
            {activities.map(activity => {
                return (
                    <div className="col-sm-3">
                        <div className="card mb-3 shadow" key={activity.id}>
                            {/* <div onClick={() => alert("Added to your activities list")}> */}
                            <div onClick={ () => AddActivities(userid, activity)}>
                                
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