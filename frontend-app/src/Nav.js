import { NavLink } from 'react-router-dom'
import "./index.css";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'


function NavBar() {
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
              <Nav.Link href="/">
                Home
              </Nav.Link>
              <Nav.Link href="/intro/">
                New Here?
              </Nav.Link>
              <Nav.Link href="/profile/">
                Profile 🚧
              </Nav.Link>
              <Nav.Link href="/events/">
                Events
              </Nav.Link>
              <Nav.Link href="/activities/">
                Activities
              </Nav.Link>
              <Nav.Link href="/partnerfinder/">
                Kindler
              </Nav.Link>

              {/* <NavDropdown
                id="nav-dropdown-dark-example"
                title="Social"
                menuVariant="dark"
              >
                <NavDropdown.Item href="/events/new/">
                  Add Event 🚧
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown> */}

                <Nav.Link href="/signup">
                  Sign Up
                </Nav.Link>
                <Nav.Link href="/login">
                  Login
                </Nav.Link>
                <Nav.Link href="/logout">
                  Logout
                </Nav.Link>



            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
export default NavBar