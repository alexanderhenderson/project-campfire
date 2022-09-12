import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserHomepage from "./UserHomepage";
import Events from "./Components/EventCard";
import UserProfile from './UserProfile';
import LogIn from './login';
import LogOut from './logout';
import { AuthProvider } from "./Authorization";
import ActivitiesList from './ActivitiesList';
import EventDetail from './EventDetail';

import Nav from './Nav';

import MainHomePage from './MainHomepage';
import Signup from "./SignUp";
import MemberMatcher from "./MemberMatcher";
import MainPage from "./MainHomepage"
import EventList from './EventPage'

import NavBar from './Nav'



function App() {
  return (
  <AuthProvider>
    <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainHomePage/>} />
            <Route path="matcher" element ={<MemberMatcher/>} />
            <Route path="/" element={<MainPage />} />
            <Route path="home" element={<UserHomepage />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="login" element={<LogIn />} />
            <Route path="logout" element={<LogOut />} />
            <Route path="signup" element={<Signup />} />
            <Route path="events" element={<EventList />} />
            <Route path="activities" element={<ActivitiesList />} />
            <Route path="events">
              <Route path="detail" element={<EventDetail />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App;
