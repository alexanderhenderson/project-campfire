import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"


export default function UserProfile() {
    const [userData, setUserData] = useState({})
    const [events, setEvents] = useState([])
    const navigate = useNavigate();
    const { id } = useParams()


    console.log(id)
    useEffect(() => {
        const getUserdata = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/${id}`;
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
    }, [id])

    let currentUser = userData.id
    let attendedEvents = []
    for (let evt of events) {
        let evtAtt = evt.attendees
        for (let x of evtAtt) {
            if (x.id === currentUser) {
                attendedEvents.push(evt)
            }
        }
    }

    let slicedlist = attendedEvents.slice(0,3)
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
                                                {slicedlist.map(att => (
                                                    <tr key={att.id}>
                                                        <td>{att.name}</td>
                                                        <td ><img className="tiny-card" src={att.picture_url} alt="" ></img></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="col">
                                        <h4>Favorite Activities</h4>
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button" type="button"
                                                    data-bs-toggle="collapse" data-bs-target="#collapseOne" 
                                                    aria-expanded="true" aria-controls="collapseOne">
                                                        Click to expand
                                                    </button>
                                                </h2>
                                                <div id="collapseOne" className="accordion-collapse collapse" 
                                                aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className="col">
                                                            <table className="table ">
                                                                <tbody>
                                                                    {userData?.favorite_activities?.map(activity => (
                                                                        <tr key={activity.id}>
                                                                            <td>{activity.name}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        <h4 className="col padding-top-med">Friends List</h4>
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button className="accordion-button" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#collapseTwo" 
                                                        aria-expanded="true" aria-controls="collapseTwo">
                                                    Click to expand
                                                    </button>
                                                </h2>
                                                <div id="collapseTwo" className="accordion-collapse collapse" 
                                                    aria-labelledby="headingTwo" >
                                                <div className="accordion-body">
                                                    <div className="col">
                                                        <table className="table">
                                                            <tbody>
                                                                {userData?.friends?.map(friend => (
                                                                    <tr key={friend.id}>
                                                                        <td className= "pointer"
                                                                        onClick={() => {
                                                                            navigate(`/profile/${friend.id}/`)
                                                                        }}>
                                                                        {friend.username}</td>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}