import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./Authorization"
import IntroPage from "./IntroPage"
import UserHomepage from "./UserHomepage"
import NavBar from './Nav'
import UserProfile from './UserProfile'
import LogIn from './Login'
import LogOut from './Logout'
import Signup from "./SignUp"
import EventList from './EventPage'
import ActivitiesList from './ActivitiesList'
import EventDetail from './EventDetail'
import MainPage from "./MainPage"
import Kindler from "./Kindler";

export default function App() {
  const domain = /https:\/\/[^/]+/
  const basename = process.env.PUBLIC_URL.replace(domain, '')
  
  return (
  <AuthProvider>
    <BrowserRouter basename={basename}>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="kindler" element ={<Kindler/>} />
            <Route path="/" element={<MainPage />} />
            <Route path="intro" element={<IntroPage />} />
            <Route path="userhome" element={<UserHomepage />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="login" element={<LogIn />} />
            <Route path="logout" element={<LogOut />} />
            <Route path="signup" element={<Signup />} />
            <Route path="events" element={<EventList />} />
            <Route path="activities" element={<ActivitiesList />} />
            {/* <Route path="kinder" element={<Kinder />} /> */}
            <Route path="events">
              <Route path=":dynamicId" element={<EventDetail />} />
              {/* <Route path="new" element={<CreateEvent />} /> */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
