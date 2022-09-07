import {useEffect, useState } from 'react'


export async function AddActivities(userid, activity) {
        const url = `${process.env.REACT_APP_USERS}/users/${userid}/`
        const data = {favorite_activities : [activity.id]};
        const fetchConfig = {
        method: "PUT",
        body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json',
                },
        }
        const response = await fetch(url, fetchConfig);
        console.log(data)
        
    }


  
//     const getActivityData = async () => {
//         const url = `${process.env.REACT_APP_EVENTS}/events/activities/`;
//         const response = await fetch(url);
//         if(response.ok){
//             const data = await response.json()
//             setActivitiesData(data["Activities"])
//         } else {
//             setError("Could not load the activities, try again")
//         }
//     }
//     getActivityData()
// }, [setActivitiesData,setError])