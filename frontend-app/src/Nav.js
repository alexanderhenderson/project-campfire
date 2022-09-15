import "./index.css"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useToken } from './Authorization'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "./UserContext";

export function settingLinks() {
  const NAVLINK = process.env.REACT_APP_NAVLINK
  
  // declare link variables here
  let home = ''
  let intro = ''
  let profile = ''
  let events = ''
  let activities = ''
  let kindler = ''
  let signup = ''
  let login = ''
  let logout = ''

  if (NAVLINK !== undefined) {
    // add a link variable = NAVLINK + current href
    home = NAVLINK + "/"
    intro = NAVLINK + "/intro/"
    profile = NAVLINK + "/profile/"
    events = NAVLINK + "/events/"
    activities = NAVLINK + "/activities/"
    kindler = NAVLINK + "/kindler/"
    signup = NAVLINK + "/signup/"
    login = NAVLINK + "/login/"
    logout = NAVLINK + "/logout/"
  } else {
    // add a link variable = current href
    home = "/"
    intro = "/intro/"
    profile = "/profile/"
    events = "/events/"
    activities = "/activities/"
    kindler = "/kindler/"
    signup = "/signup/"
    login = "/login/"
    logout = "/logout/"
  }
  // add link variable to return array
  return ([home, intro, profile, events, activities, kindler, signup, login, logout])
}

export default function NavBar() {
  const [homeLink, introLink, profileLink, eventsLink, activitiesLink, kindlerLink, signupLink, loginLink] = settingLinks()
  // eslint-disable-next-line no-unused-vars
  const [token, login, logout] = useToken()
  // eslint-disable-next-line no-unused-vars
  const [logoutResponse, setLogoutResponse] = useState()
  const [loggedIn, setLoggedIn]=useState(false)
  // const [userId, setUserId] = useState([])
  const navigate = useNavigate();
  const {userId} = useContext(UserContext)


  function checkLoggedIn(token){
    if (token){
        setLoggedIn(true)
        console.log('token exists')
    }
  }


  useEffect( ()=>{checkLoggedIn(token)},[token])
  async function onLogout() {
    const result = await logout()
    setLogoutResponse(result)
    console.log('LOGGED OUT SUCCESSFULLY')
  }
  // console.log("this should be userID", userId)
  return (
    <div className='mb-3'>
      <Navbar sticky="top" variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href={homeLink}>
            <img
            // will need to update all src= across the app
              src={`${process.env.PUBLIC_URL}/favicon.ico`}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href={homeLink}>Campfire</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            {/* replace href with {link variable} */}
            <Nav>
              <Nav.Link href={homeLink} className='mx-1'> Home </Nav.Link>
              <Nav.Link href={introLink} className='mx-1'> New Here? </Nav.Link>
              <Nav.Link onClick={() => { navigate(`/profile/${userId.id}`)}} className='mx-1'> Profile </Nav.Link>
              <Nav.Link href={eventsLink} className='mx-1'> Events </Nav.Link>
              <Nav.Link href={activitiesLink} className='mx-1'> Activities </Nav.Link>
              <Nav.Link href={kindlerLink} className='mx-1'> Kindler </Nav.Link>
              <Nav.Link href={signupLink} className={"mx-1" + (loggedIn ? " d-none":"")}> Sign Up </Nav.Link>
              <Nav.Link href={loginLink} className={"xy-1" + (loggedIn ? " d-none":"") }> Login </Nav.Link>
              <Nav.Link onClick={onLogout} className={"mx-1" + (loggedIn ? "":" d-none")}> Logout </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
