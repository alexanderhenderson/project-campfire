import { useEffect, useState } from "react"


export default function UserProfile() {
    const [userData, setUserData] = useState({})
    const [events, setEvents] = useState([])

    useEffect(() => {
        const getUserdata = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`;
            const response = await fetch(url, { credentials: "include" });
            if (response.ok) {
                const data = await response.json()
                setUserData(data)
            }
        }
        const requestEvents = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/`
            const response = await fetch(url);
            if (response.ok) {
              const data = await response.json()
              events.current = data.Events
              setEvents(events.current)
            }
        }
          
          requestEvents()

        getUserdata()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    let currentUser = userData.id
    
    let attendedEvents = []
    for(let evt of events){
        let evtAtt = evt.attendees
        for(let x of evtAtt){
           if(x.id === currentUser){
               attendedEvents.push(evt)
           }
        }
    }

    return (
        <>
            <div className="container p-4">
                <div className="col">
                    <div className="card shadow">
                        <div className="container m-3">
                            <div className="container">
                                <div className="row">
                                    <div className="body my-3">
                                        <h1>{userData.username}</h1>
                                    </div>
                                    <div className="col">
                                        <div className='mb-5'>
                                            <img src={userData.profile_photo} height='200' alt="" />
                                        </div>
                                        <div className='m-2'>
                                            <h4>Name: </h4>
                                            <p>{userData.first_name} {userData.last_name}</p>
                                            <h4>About Me: </h4>
                                            <p>{userData.profile_description}</p>
                                            <h4>Location</h4>
                                            <p>{userData.city}, {userData.state}</p>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <h4>Events I'm Attending</h4>
                                        <table className="table">
                                            <tbody>
                                                {attendedEvents.map(att => (
                                                    <tr key={att.id}>
                                                        <td>{att.name}</td>
                                                        <td ><img className="tiny-card" src={att.picture_url}></img></td>  
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col">
                                        <h4>Favorite Activities</h4>
                                        <table className="table">
                                            <tbody>
                                                {userData?.favorite_activities?.map(activity => (
                                                    <tr key={activity.id}>
                                                        <td>{activity.name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <h4>Friends</h4>
                                        <table className="table">
                                            <tbody>
                                                {userData?.friends?.map(friend => (
                                                    <tr key={friend.id}>
                                                        <td>{friend.username}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}