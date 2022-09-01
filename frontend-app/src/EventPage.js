import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

export default function EventList(props) {
  const [events, setEvents] = useState([])
  // const [limitEvents, setLimitEvents] = useState([])
  useEffect(() => {
    const requestEvents = async () => {
      const url = `${process.env.REACT_APP_EVENTS}/events/`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json()
        // console.log('Data pulled from json response: ', data)
        setEvents(data.Events)
        // const sliced = (data.Events.slice(0, 3))
        // setLimitEvents(sliced)
        // console.log('Sliced events: ', sliced)
        console.log('Events after setEvents is called: ', data.Events)
      } else {
        console.log("Could not load the events, try again")
      }
    }
    requestEvents()
  }, [setEvents])
  return (
    <>
      <div class="page-header">
        <h1>Events</h1>
      </div>
      <div className="row">
        {events.map(event => {
          return (
            <div className="col-sm-4" key={event.id}>
              <div className="card mb-3 shadow h-100">
                <img src={event.picture_url} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {event.activity.name}
                  </h6>
                  <p className="card-text">
                    {event.description}
                  </p>
                </div>
                <div className="card-footer">
                  {new Date(event.start).toLocaleDateString()}
                  {/* -
                    {new Date(event.end).toLocaleDateString()} */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}