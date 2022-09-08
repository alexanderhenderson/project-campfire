import { useEffect, useState } from 'react'


export async function addActivities(userid, activity) {
        const url = `${process.env.REACT_APP_USERS}/users/${userid}/`
        const data = { favorite_activities: [activity.id] };
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


