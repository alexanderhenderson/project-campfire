import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { settingLinks } from './Nav'
import { UserContext } from './UserContext'

export default function MainPage() {
  const [, , , , , , signupLink, loginLink] = settingLinks()
  const { userId } = useContext(UserContext)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const checkUserID = () => {
      if (userId.id) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }
    checkUserID()
  }, [userId])

  return (
    <>
      <div className='main-bg'></div>
      <div className='home-div'>
        <div className='p-5 text-center'>
          <div className='d-flex justify-content-center align-items-center h-500'>
            <div className='text-white'>
              <h1 className='mb-3 hero-text font-weight-bold'>Campfire</h1>
              <h4 className='mb-3 hero-sub-text'>Come join our campfire</h4>
              <div className={'hero-bottom' + (loggedIn ? ' d-none' : '')}>
                <a className='btn btn-outline-light btn-lg rounded-pill mb-3' href={signupLink} role='button'>Sign Up</a>
                <p className='forgot-password'> Already Signed Up? <a href={loginLink}>Log In</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
