import { useEffect } from "react"
import { useState } from "react"


function FetchActivities(){
    const [activities, setActivitiesData] = useState([])
    const [error, setError] = useState("")


    useEffect(()=> {
        const getActivityData = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/list/`;
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

    return (
        <>
        <h1 className = "special" >Activities List</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => {
                return ( 
                    <tr key={activity.id}>
                    <td>{ activity.name }</td>
                    <td>{ activity.description }</td>
                    </tr>
                );
            })}
          </tbody>
        </table>
        </>
    )        
}

export default FetchActivities