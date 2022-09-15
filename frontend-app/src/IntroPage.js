import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'


export default function IntroPage() {

  return (
    <>
      <div className='intro-bg'></div>
      <div className="px-4 text-center text-white over-bg padding-top">
        <div className="mb-3">
          <h1>New here? Let us show you around.</h1>
        </div>
        </div>
        {/* <div className="mb-3">
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
        </div> */}

        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" class=""></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" class="active" aria-current="true"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item">
              {/* <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg> */}
              <img
                className="d-block"
                src="http://localhost:3000/favicon.ico"
                height='300'
              />
              <div class="container">
                <div class="carousel-caption">
                  <h1>Activities</h1>
                  <p>Select some favorite activities so we know what you're into.</p>
                  <p> <a className="btn btn-outline-light btn-lg rounded-pill mb-3" href="/activities/" role="button">See All Activities</a></p>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              {/* <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg> */}
              <img
                className="d-block"
                src="http://localhost:3000/favicon.ico"
                height='300'
              />
              <div class="container">
                <div class="carousel-caption">
                  <h1>Kindler</h1>
                  <p>Meet friends based on common interests in activities. </p>
                  <p><a className="btn btn-outline-light btn-lg rounded-pill mb-3" href="/partnerfinder/" role="button">Kindler: Meet Your Match 🔥</a></p>
                </div>
              </div>
            </div>
            <div class="carousel-item active">
              {/* <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg> */}
              <img
                  className="d-block"
                  src="http://localhost:3000/favicon.ico"
                  height='300'
                />
              <div class="container">
                <div class="carousel-caption">
                  <h1>Events</h1>
                  <p>Find your next adventure or create your own!</p>
                  <p><a className="btn btn-outline-light btn-lg rounded-pill mb-3" href="/events/" role="button">See All Events</a></p>
                </div>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        {/* <EventCard /> */}
      {/* </div> */}
    </>
  )
}
