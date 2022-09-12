import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { addAttendee } from "./Components/AddAttendee"

function FetchEvent() {
    const [Events, setEventsData] = useState([])
    const [error, setError] = useState("")
    const [userData, setUserId] = useState("")
    const [attendeesList, setAttendeesList] = useState([])
    const {dynamicId} = useParams()
    const [button, setButton] = useState('btn btn-outline-warning button-font')
   
   
    useEffect(() => {
        const getEventData = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/${dynamicId}`
            const response = await fetch(url)
            if (response.ok) {
                const eventData = await response.json()
                
                setEventsData(eventData["Event"])
                setAttendeesList(eventData.Event.attendees)
                
            } else {
                setError("Could not load the events, try again")
            }
        }
    

        const getUserdata = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`;
            const response = await fetch(url, { credentials: "include" });
            if (response.ok) {
                const userData = await response.json()
                setUserId(userData)

            }
        }
        getEventData()
        getUserdata()
    }, [])
    
    const eventAttendees = Events.attendees
    const currentUser = userData.id
    
    function clickHandler(){     
        addAttendee(userData.id, dynamicId)
        setButton('btn btn-outline-warning button-font d-none')
        setAttendeesList([...attendeesList, userData])
        
    }  
    return (
        <>
            <div className="container px-4 py-4">
                <div className="row">
                    <div className="col">
                        <div className="card shadow">
                            <div className="card body px-4 py-4">
                                <h1 className='display-4 text-center'> {Events?.name || ''} </h1>
                                {<img src={Events?.picture_url} className='img-fluid max-width: 100%' />}
                                <p> 
                                    <button onClick={() => { 
                                    clickHandler()
                                 }}
                                 type="button" className={button}>Click to Attend</button>
                                </p>
                                <span className='mt-3'>
                                    <h2 className='display-6'>Description</h2>
                                    <p className='lead text-left'>{Events?.description || ''}</p>
                                    <h3 className='display-6'>Activity</h3>
                                    <p className='lead'>{Events?.activity?.name || ''}</p>
                                    <h3 className='display-6'>Dates</h3>
                                    <p className='lead'>{new Date(Events?.start).toLocaleString()} - {new Date(Events?.end).toLocaleString()}</p>
                                    <h3 className='display-6'>Attendees</h3>
                                </span>
                                <table className="table">
                                    <tbody>
                                        {attendeesList.map(attendee => {
                                            return (
                                            <tr key={attendee.id}>
                                                <td>{attendee.first_name} {attendee.last_name}</td>
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
        </>
    )
}

export default FetchEvent