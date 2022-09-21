import { useEffect, useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import Comments from "./Components/Comments"
import { UserContext } from "./UserContext"
import { settingLinks } from "./Nav"

export default function UserProfile() {
    const [userData, setUserData] = useState({})
    const [events, setEvents] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
    const { userId } = useContext(UserContext)
    const [ , , , , , , , , , editProfileLink] = settingLinks()
    const [friend, setFriend] = useState(false)

    useEffect(() => {
        const getUserdata = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/${id}`
            const response = await fetch(url, { credentials: "include" })
            if (response.ok) {
                const data = await response.json()
                setUserData(data)

                if (userId != undefined){
                    let friends = []
                    for (let friendKey in userId.friends){
                        console.log("User loops: ", userId.friends[friendKey].id)
                        friends.push(userId.friends[friendKey].id)
                    }
                   
                    if (friends.includes(data.id)){
                        setFriend(true)
                    } else {
                        setFriend(false)
                    }
                }

            } else {
                console.log("getsUserData failed")
            }
        }
        const requestEvents = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/`
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                events.current = data.Events
                setEvents(events.current)
            }
        }

        // work in progress
        const requestFriends = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/`
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                events.current = data.Events
                setEvents(events.current)
            }
        }

        requestEvents()

        getUserdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, userId])

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
    let slicedlist = attendedEvents.slice(0, 3)


    // this function is for the add friend button
    async function onClick() {
		const url = `${process.env.REACT_APP_USERS}/users/api/friend/`;
		const params = {
			method: "put",
			body: userData.id,
			credentials: "include",
		};
		const response = await fetch(url, params);
		if (response.status === 200) {
            console.log("Friend added")
            setFriend(true)
		}
	}

    // this function is for deleting comments on your page
    async function deleteComment() {
		const url = `${process.env.REACT_APP_USERS}/users/api/friend/`;
		const params = {
			method: "put",
			body: userData.id,
			credentials: "include",
		};
		const response = await fetch(url, params);
		if (response.status === 200) {
            console.log("Friend added")
            setFriend(true)
		}
	}


    return (
        <>
            <div className="container">
                <div className="card shadow">
                    <div className="container m-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm">
                                    <div className="body my-3 text-center">
                                        <h1>{userData.username}</h1>
                                        {/* eslint-disable-next-line */}
                                        {userId.id == id ? (
                                            <div><a className="btn btn-dark rounded-pill mb-3" href={`${editProfileLink}${userId.id}`} role="button">Edit Profile</a></div>) 
                                            : (friend == false ? (
                                                <button
													type="button"
													className="btn btn-dark rounded-pill"
													onClick={() => {
														onClick();
													}}
												>
													{" "}
													Add to Friend's List{" "}
												</button>
                                                ) : "is your friend")}
                                            {/* {friend == false ? ("Add friend button") : ("Already a friend")} */}
                                    </div>
                                    <div className="col">
                                        <div className='mb-3 text-center'>
                                            <img src={userData?.profile_photo || "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" } height='200' alt="" />
                                        </div>
                                        <div className='m-1 text-center'>
                                            <h4>Name: </h4>
                                            <p>{userData.first_name} {userData.last_name}</p>
                                            <h4>About Me: </h4>
                                            <p>{userData.profile_description}</p>
                                            <h4>Location</h4>
                                            <p>{userData.city}, {userData.state}</p>
                                        </div>
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

                                            <div className='mt-5'>
                                                <h4>Friends List</h4>
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
                                                                                    <td className="pointer"
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

                                <div className="col-sm text-center">
                                    <h4>RSVP'd Events</h4>
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
                            </div>


                            <div className="container">
                                <div className="row">
                                    <Comments />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
