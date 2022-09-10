import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

export default function EventCard(props) {
  const [limitEvents, setLimitEvents] = useState([])
  useEffect(() => {
    const requestEvents = async () => {
      const url = `${process.env.REACT_APP_EVENTS}/events/`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json()
        const sliced = (data.Events.slice(1, 4))
        setLimitEvents(sliced)
      } else {
        console.log("Could not load the events, try again")
      }
    }
    requestEvents()
  }, [setLimitEvents])
  return (
    <div className="row">
      {limitEvents.map(event => {
        return (
          <div className="col-sm-4" key={event.id}>
            <div className="card mb-3 shadow h-200">
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
  )
}