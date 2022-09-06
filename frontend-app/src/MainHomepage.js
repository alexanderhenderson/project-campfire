import React from "react"
import EventCard from "./Components/EventCard"
import { useNavigate, Link } from "react-router-dom"


function MainPage() {
  const nagivate = useNavigate()

  return (
    <>
      <div className="d-flex justify-content-center">
        <img className="mw-100 mt-3" src="/cf-logo.png" alt="Max-width 100%" />
      </div>
      <div className="px-4 py-5 my-5 text-center mb-3">
        <h2>Gather around the campfire with new friends</h2>
        <div className='m-3'>
        <Link to="signup">
          <button type="button" className="btn btn-primary btn-lg btn-block">Register</button>
        </Link>
        </div>
        
        <div className="d-flex justify-content-center">
          <img src="/cf4.jpeg" height='280' className="rounded" />
          <p>&nbsp;&nbsp;&nbsp;</p>
          <img src="/cf3.jpeg" height='280' className="rounded" />
          <p>&nbsp;&nbsp;&nbsp;</p>
          <img src="/cf5.jpeg" height='280' className="rounded" />
        </div>
      </div>
      <div className="px-4 py-5 my-5 text-center mb-3">
        <h2>Find Your Next Adventure</h2>
        <EventCard />
      </div>
    </>
  );
}

export default MainPage;
