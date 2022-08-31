import { useEffect } from "react"
import { useState } from "react"


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

    return (
        <main>
            <div className="row">
            {activities.map(activity => {
                return (
                    <div className="col-sm-3">
                    <div className="card mb-3 shadow" key={activity.id}>
                        {/* <img src={event.picture_url} className="card-img-top" /> */}
                        <div className="card-body">
                            <h5 className="card-title">{activity.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                            {activity.name}
                            </h6>
                            <p className="card-text">
                                Activity Name 
                            </p>
                        </div>
                    
                        </div>
                        </div>
                );
            })}
            </div>
        </main>
      )
      
    

    // return (
    //     <>
    //     <h1 className = "special" >Activities List</h1>
    //     <table className="table table-striped">
    //       <thead>
    //         <tr>
    //           <th>Name</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {activities.map(activity => {
    //             return ( 
    //                 <tr key={activity.id}>
    //                 <td>{ activity.name }</td>
    //                 </tr>
    //             );
    //         })}
    //       </tbody>
    //     </table>
    //     </>
    // )        
}

export default FetchActivities