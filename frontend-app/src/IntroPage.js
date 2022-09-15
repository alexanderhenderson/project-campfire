import React from 'react'


export default function IntroPage() {

  return (
    <>
      <div className='intro-bg'></div>
      <div className="px-4 text-center text-black over-bg padding-top">
        <div className="mb-3">
          <h1>New here? Let us show you around.</h1>
        </div>
      </div>
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className="" aria-current="true"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg> */}
            <img
              className="d-block"
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"
              height='300'
              alt=''
            />
            <div className="container">
              <div className="carousel-caption text-black">
                <h1>Activities</h1>
                <h3>Let us know what you're into.</h3>
                <div className='mt-4'>
                  <p> <a className="btn btn-outline-dark btn-lg rounded-pill mb-3" href="/activities/" role="button">See All Activities</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg> */}
            <img
              className="d-block"
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"
              height='300'
              alt=''
            />
            <div className="container">
              <div className="carousel-caption text-black">
                <h1>Kindler</h1>
                <div className='mt-4'>
                  <h3>Meet friends based on common interests. </h3>
                  <p><a className="btn btn-outline-dark btn-lg rounded-pill mb-3" href="/partnerfinder/" role="button">Kindler: Meet Your Match 🔥</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg> */}
            <img
              className="d-block"
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"
              height='300'
              alt=''
            />
            <div className="container">
              <div className="carousel-caption text-black">
                <h1>Events</h1>
                <h3>Find your next adventure or create your own!</h3>
                <div className='mt-4'>
                  <p><a className="btn btn-outline-dark btn-lg rounded-pill mb-3" href="/events/" role="button">See All Events</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* <EventCard /> */}
      {/* </div> */}
    </>
  )
}
