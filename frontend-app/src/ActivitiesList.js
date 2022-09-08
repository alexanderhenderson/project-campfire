import { useEffect, useState } from "react"
import { addActivities } from "./Components/AddActivityToList"

export default function FetchActivities() {
    const [activities, setActivitiesData] = useState([])
    const [userData, setUserId] = useState("")
    const [activityList, setActivityList] = useState([])

    useEffect(() => {
        //promise Chain cool! 
        // const userFetch = fetch (`${process.env.REACT_APP_USERS}/users/api/tokens/user/`, {
        //     credentials: "include",
        //   }).then(response => response.json()).then(data => setUserId(data.id))

        const getActivityData = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/activities/`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json()
                setActivitiesData(data["Activities"])
            }
        }

        const getUserdata = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`;
            const response = await fetch(url, { credentials: "include" });
            if (response.ok) {
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
            <div className="m-3">
                <h1>Activities</h1>
                <h4>Click to add to your favorite activities!</h4>
            </div>
            <div className="m-3">
                <div className="row ">
                    {activities.filter(act => !userFavesIds.includes(act.id))
                        .map(activity => {
                            return (
                                <div className="col-sm-4" key={activity.id}>
                                    <div className="card mb-3 shadow h-100 pointer">
                                        <div onClick={() => { addActivities(userData.id, activity) }}>
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
            </div>
        </main>
    );
}
