import { useEffect, useState } from "react"


function FetchEvent() {
    const [Events, setEventsData] = useState([])
    const [error, setError] = useState("")


    useEffect(() => {
        const getEventData = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/` // Will need to update this to dynamic url (.../events/1/)
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                // console.log(data)
                setEventsData(data["Events"])
            } else {
                setError("Could not load the events, try again")
            }
        }
        getEventData()
    }, [setEventsData, setError])

    return (
        <>
            <div className="container px-4 py-4">
                <div className="row gx-5">
                    <div className="col">
                        <div className="card shadow">
                            <div className="card body px-4 py-4">
                                <h1 className='display-4 text-center'> {Events[0]?.name || ''}</h1>
                                {<img src={Events[0]?.picture_url} className='img-fluid max-width: 100%' />}
                                <span className='mt-3'>
                                    <h2 className='display-6'>Description</h2> 
                                    <p className='lead text-left'>{Events[0]?.description || ''}</p>
                                    <h3 className='display-6'>Activity</h3>
                                    <p className='lead'>{Events[0]?.activity.name || ''}</p>
                                    <h3 className='display-6'>Dates</h3>
                                    <p className='lead'>{new Date(Events[0]?.start).toLocaleString()} - {new Date(Events[0]?.end).toLocaleString()}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FetchEvent