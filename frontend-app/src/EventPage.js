import { Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'

export default function EventList(props) {
  const events = useRef([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const requestEvents = async () => {
      const url = `${process.env.REACT_APP_EVENTS}/events/`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json()
        events.current = data.Events
        setFilteredEvents(events.current)
        console.log('Events after setEvents is called: ', data.Events)
      } else {
        console.log("Could not load the events, try again")
      }
    }
    requestEvents()
  }, [])

  function searchFilter() {
    const searchedEvents = events.current.filter(event => event.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredEvents(searchedEvents)
  }
  useEffect(() => { searchFilter() }, [search])

  function handleChange(event) {
    setSearch(event.target.value)
  }

  return (
    <>
      <div className="page-header mt-3 mb-3">
        <h1>Events</h1>
      </div>
        <div>
          <input
            type="search"
            id="search"
            className="form-control"
            placeholder="Search for events"
            onChange={handleChange}
            aria-label="Search"
          />
        </div>
      <div className="row">
        {filteredEvents.map(event => {
          return (
            <div className="col-sm-4 mt-3 mb-3" key={event.id}>
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