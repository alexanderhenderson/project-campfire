import React from 'react'
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { addAttendee } from "./Components/AddAttendee"
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'

export default function FetchEvent() {
    const [Events, setEventsData] = useState([])
    const [error, setError] = useState("")
    const [userData, setUserId] = useState("")
    const [attendeesList, setAttendeesList] = useState([])
    const { dynamicId } = useParams()
    const navigate = useNavigate()
    const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY })
    const containerStyle = { width: '400px', height: '300px' }
    const [center, setCenter] = useState({ lat: 0, lng: 0 })


    // console.log(dynamicId)

    useEffect(() => {
        const getEventData = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/${dynamicId}`
            const response = await fetch(url)
            if (response.ok) {
                const eventData = await response.json()
                console.log(eventData)
                setEventsData(eventData["Event"])
                setAttendeesList(eventData.Event.attendees)
                setCenter({ lat: +eventData.Event.latitude, lng: +eventData.Event.longitude })
                console.log(eventData.Event.latitude, eventData.Event.longitude)
                console.log(center)
            } else {
                setError("Could not load the events, try again")
                console.log(error)
            }
        }


        const getUserdata = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`
            const response = await fetch(url, { credentials: "include" })
            if (response.ok) {
                const userData = await response.json()
                setUserId(userData)

            }
        }
        getEventData()
        getUserdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [])

    const currentUser = userData.id

    function clickHandler() {
        addAttendee(userData.id, dynamicId)
        setAttendeesList([...attendeesList, userData])
    }

    let container = []
    for (let att of attendeesList) {
        container.push(att.id)
    }


    if (!isLoaded) return <div>Loading...</div>

    return (
        <>
            <div className="container px-4 py-4">
                <div className="row">
                    <div className="col">
                        <div className="card shadow">
                            <div className="card body px-4 py-4">
                                <h1 className='display-4 text-center'> {Events?.name || ''} </h1>
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            {<img src={Events?.picture_url} className='img-fluid max-width: 100%' alt="" />}
                                        </div>
                                        <div className="col">
                                            <span className='mt-3'>
                                                <h2 className='display-6'>Description</h2>
                                                <p className='lead text-left'>{Events?.description || ''}</p>
                                                <h3 className='display-6'>Activity</h3>
                                                <p className='lead'>{Events?.activity?.name || ''}</p>
                                                <h3 className='display-6'>Dates</h3>
                                                <p className='lead'>{new Date(Events?.start).toLocaleString()} - {new Date(Events?.end).toLocaleString()}</p>
                                            </span>
                                            <div className='mt-5 text-center'>
                                                <p>
                                                    {container.indexOf(currentUser) === -1 ? <button onClick={() => {
                                                        clickHandler()
                                                    }} type="button" className='btn btn-dark btn-lg rounded-pill'>RSVP</button> : null}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            {/* <h3>Coordinates</h3>
                                            <p className='lead'>{Events?.latitude || ''}, {Events?.longitude || ''}</p> */}
                                            <GoogleMap
                                                zoom={10} center={center} mapContainerStyle={containerStyle}>
                                                <Marker position={center} />
                                            </GoogleMap>


                                        </div>
                                        <div className="container mt-3">
                                            <h3 className='display-6'>Attendees</h3>
                                            <table className="table">
                                                <tbody>
                                                    {attendeesList.map(attendee => {
                                                        return (
                                                            <tr key={attendee.id}>
                                                                <td className="pointer"
                                                                    onClick={() => { navigate(`/profile/${attendee.id}/`) }}>
                                                                    {attendee.first_name} {attendee.last_name}
                                                                </td>
                                                            </tr>
                                                        )

                                                    })}
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
        </>
    )
}
