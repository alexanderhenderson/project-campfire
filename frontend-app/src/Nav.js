import "./index.css";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import React from 'react'
import { useState, useEffect } from 'react'
import { useToken } from './Authorization'


export default function NavBar() {
  // eslint-disable-next-line no-unused-vars
  const [token, login, logout] = useToken()
  // eslint-disable-next-line no-unused-vars
  const [logoutResponse, setLogoutResponse] = useState()
  const [loggedIn, setLoggedIn]=useState(false)


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

  return (
    <div className='mb-3'>
      <Navbar sticky="top" variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="/favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/">Campfire</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <Nav.Link href="/" className='mx-1'> Home </Nav.Link>
              <Nav.Link href="/intro/" className='mx-1'> New Here? </Nav.Link>
              <Nav.Link href="/profile/" className='mx-1'> Profile </Nav.Link>
              <Nav.Link href="/events/" className='mx-1'> Events </Nav.Link>
              <Nav.Link href="/activities/" className='mx-1'> Activities </Nav.Link>
              <Nav.Link href="/kindler/" className='mx-1'> Kindler </Nav.Link>
              <Nav.Link href="/signup" className={"mx-1" + (loggedIn ? " d-none":"")}> Sign Up </Nav.Link>
              <Nav.Link href="/login" className={"xy-1" + (loggedIn ? " d-none":"") }> Login </Nav.Link>
              <Nav.Link onClick={onLogout} className={"mx-1" + (loggedIn ? "":" d-none")}> Logout </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
