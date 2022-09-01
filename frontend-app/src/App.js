<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import UserHomepage from './UserHomepage';
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserHomepage from "./UserHomepage";
import Events from "./Components/EventCard";
// import { AuthProvider } from "./Auth";
import UserProfile from './UserProfile';
>>>>>>> main
import LogIn from './login';
import LogOut from './logout';
import { AuthProvider } from "./Authorization";
import ActivitiesList from './ActivitiesList';
import EventDetail from './EventDetail';
import Nav from './Nav';
<<<<<<< HEAD
=======
import MainHomePage from './MainHomepage';
>>>>>>> main

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainHomePage/>} />
            <Route path="User">
              <Route path="homepage" element={<UserHomepage/>} />
              <Route path="profile" element={<UserProfile />} />
<<<<<<< HEAD
              <Route path="Login" element={< LogIn />} />
              <Route path="Logout" element={< LogOut />} />
=======
              <Route path="login" element={< LogIn />} />
              <Route path="logout" element={< LogOut />} />
>>>>>>> main
              {/* <Route path="new" element={<CreateAuto/>} /> */}
            </Route>
            <Route path="Events">
              {/* <Route path="create" element={<CreateEvent/>} /> */}
              {/* <Route path="list" element={<EventsList/>} /> */}
              <Route path="detail" element={<EventDetail/>} />
            </Route>
            <Route path="Activities">
              <Route path="list" element={<ActivitiesList/>} />
              {/* <Route path="create" element={<CreateActivity/>} /> */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
