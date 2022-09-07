import { useEffect, useState } from "react"


function FetchEvents(){
    const [Events, setEventsData] = useState([])
    const [error, setError] = useState("")


    useEffect(()=> {
        const getEventData = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/`;
            const response = await fetch(url);
            if(response.ok){
                const data = await response.json()
                console.log(data)
                setEventsData(data["Events"])
            } else {
                setError("Could not load the events, try again")
            }
        }
        getEventData()
    }, [setEventsData,setError])

    return (
        <>
        <h1> { Events[0]?.name || '' }</h1>
        {<img src={Events[0]?.picture_url} width='400'/>}
        <p>{ Events[0]?.description || '' }</p>
        <p>{ Events[0]?.activity.name || ''}</p>
        <p>{ Events[0]?.start || '' }</p>
        <p>{ Events[0]?.end || '' }</p>
        {/* <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead> */}
          {/* <p>
            {Events.map(Event => {
                return ( 
                  <div key={Event.id}>
                      <img src={Event.picture_url} width='400'/>
                      <h1>{ Event.name }</h1>
                      <p>{ Event.description }</p>
                      <p>{ Event.activity.name }</p>
                      <p>{ Event.start }</p>
                      <p>{ Event.end }</p>
                      {/* <p>{ Event.attendees[0]}</p> */}
                  {/* </div>
                );
            })} */}
          {/* // </p> */}
        {/* </table> */}

        </>
    )        
}

export default FetchEvents