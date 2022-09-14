import "./index.css";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'

function settingLinks() {
  const NAVLINK = process.env.REACT_APP_NAVLINK
  
  // declare link variables here
  let home = ''
  let intro = ''

  if (NAVLINK !== undefined) {
    // add a link variable = NAVLINK + current href
    home = NAVLINK + "/"
    intro = NAVLINK + "/intro/"
  } else {
    // add a link variable = current href
    home = "/"
    intro = "/intro/"
  }
  // add link variable to return array
  return ([home, intro])
}

function NavBar() {
  // add link variable to declare const array
  const [homeLink, introLink] = settingLinks()

  return (
    <div className='mb-3'>
      <Navbar sticky="top" variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
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
              <Nav.Link href={homeLink}>
                Home
              </Nav.Link>
              <Nav.Link href={introLink}>
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
              <Nav.Link href="/kindler/">
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