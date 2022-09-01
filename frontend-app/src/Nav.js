import { NavLink } from 'react-router-dom';
import "./index.css";

function Nav() {
 
   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid d-flex justify-content-start">
         <NavLink className="navbar-brand" to="/"><h1>Campfire</h1></NavLink>

          {/* Navbar parent */}
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">

              {/* dropdown1 starts here */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Signup
                </a>
                {/* {theList} */}
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li className="nav-item">
                     <NavLink className="navbar-brand"  to="Users/signup">Signup</NavLink>
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
                     <NavLink className="navbar-brand"  to="/Users/login">Login </NavLink>
                 </li>
                 <li className="nav-item">
                     <NavLink className="navbar-brand"  to="/Users/logout">Logout </NavLink>
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
                     <NavLink className="navbar-brand"  to="/salesrecord/list">Your Profile</NavLink>
                 </li>
                 <li className="nav-item">
                     <NavLink className="navbar-brand"  to="/salesrecord/history">Something Else?</NavLink>
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
                     <NavLink className="navbar-brand"  to="/sales">Sales List</NavLink>
                 </li> */}
                 <li className="nav-item">
                     <NavLink className="navbar-brand"  to="/employees/list">Current Events</NavLink>
                 </li>
                 <li className="nav-item">
                     <NavLink className="navbar-brand"  to="/employees/list">Add an Events</NavLink>
                 </li>
                 <li className="nav-item">
                     <NavLink className="navbar-brand"  to="/Activities/list">Add an Activity </NavLink>
                 </li>
                 <li className="nav-item">
                     <NavLink className="navbar-brand"  to="/employees/new">Partner Finder </NavLink>
                 </li>
                </ul>
              </li>
             


            </ul>
          </div>
        </div>
      </nav>

  )
}

export default Nav;