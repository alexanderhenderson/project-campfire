import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'

export default function Hero() {


  return (
    <>
      <div className='hero'></div>
      <div className='home-div'>
      <div className="p-5 text-center">
        <div className="d-flex justify-content-center align-items-center h-500">
          <div className='text-white'>
            <h1 className="mb-3 hero-text lead"><strong>Campfire</strong></h1>
            <h4 className="mb-3 hero-sub-text lead">Come join our campfire</h4>
            <a className="btn btn-outline-light btn-lg rounded-pill" href="/signup/" role="button">Sign Up</a>
            <div className='m-5'>
            <p className="forgot-password text-right lead">
              Already Signed Up? <a href={`Login`}>Log In</a>
            </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
