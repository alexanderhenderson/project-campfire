import React from "react"
import EventCard from "./Components/EventCard"
import { Link } from "react-router-dom"


export default function IntroPage() {

  return (
    <>
      <div className='user-hero'></div>
      <div className="px-4 text-center text-white over-bg padding-top">
        <div className="mb-3">
          <h1>New here? Let us show you around.</h1>
        </div>
        <div className="mb-3">
          <h2>1. Choose Your Favorite Activities</h2>
          <a className="btn btn-outline-light btn-lg rounded-pill mb-3" href="/activities/" role="button">See All Activities</a>
        </div>

        <div className="mb-3">
          <h2>2. Kindle A Fire</h2>
          <a className="btn btn-outline-light btn-lg rounded-pill mb-3" href="/partnerfinder/" role="button">Kindler: Meet Your Match 🔥</a>
        </div>

        <div className="mb-3">
          <h2>3. Find Your Next Adventure</h2>
          <a className="btn btn-outline-light btn-lg rounded-pill mb-3" href="/events/" role="button">See All Events</a>
        </div>

        {/* <EventCard /> */}
      </div>
    </>
  )
}
