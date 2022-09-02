import { NavLink } from 'react-router-dom';
import "./index.css";
import friends from './Assets/friends.webp';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-start">
        <NavLink className="navbar-brand" to="/"><h1>Campfire</h1></NavLink>

        {/* Navbar parent */}
        <div className="collapse navbar-collapse special_nav" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">

            {/* dropdown1 starts here */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Signup
              </a>
              {/* {theList} */}
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li className="nav-item">
                  <NavLink className="navbar-brand" to="User/signup">Signup</NavLink>
                </li>
              </ul>
            </li>

            {/* dropdown 2 */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Login/Logout
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li className="nav-item">
                  <NavLink className="navbar-brand" to="/User/Login">Login </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="navbar-brand" to="/User/Logout">Logout </NavLink>
                </li>

              </ul>
            </li>

            {/* dropdown 3 */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                {/* <li className="nav-item">
                  <NavLink className="navbar-brand"  to="/sales">Sales List</NavLink>
               </li> */}
                <li className="nav-item">
                  <NavLink className="navbar-brand" to="/profile/">Your Profile</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="navbar-brand" to="/home">User Home</NavLink>
                </li>
              </ul>
            </li>

            {/* dropdown 4 */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Social
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                {/* <li className="nav-item">
                  NavLink className="navbar-brand"  to="/sales">Sales List</NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink className="navbar-brand" to="/events/list">Events</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="navbar-brand" to="/events/new">Create Event</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="navbar-brand" to="/activities/list">Activities </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="navbar-brand" to="/partnerfinder/">Partner Finder </NavLink>
                </li>

              </ul>
            </li>
            <img className='pull-right profile_circle' height='50' src={friends} alt="friends" />
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Nav;