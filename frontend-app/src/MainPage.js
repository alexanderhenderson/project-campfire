export default function MainPage() {


  return (
    <>
      <div className='main-bg'></div>
      <div className='home-div'>
        <div className="p-5 text-center">
          <div className="d-flex justify-content-center align-items-center h-500">
            <div className='text-white'>
              <h1 className="mb-3 hero-text font-weight-bold">Campfire</h1>
              <h4 className="mb-3 hero-sub-text">Come join our campfire</h4>
              <div className='hero-bottom'>
              <a className="btn btn-outline-light btn-lg rounded-pill mb-3" href="/signup/" role="button">Sign Up</a>
              <p className="forgot-password"> Already Signed Up? <a href={`Login`}>Log In</a>
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
