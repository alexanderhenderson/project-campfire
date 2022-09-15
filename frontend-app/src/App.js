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
import Kindler from "./Kindler"
import CreateEvent from'./CreateEvent';
import { UserContext } from "./UserContext"
import { useState, useEffect } from "react"

export default function App() {

const [userId, setUserId] = useState('')

useEffect(() => {
  const getUserdata = async () => {
      const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`;
      const response = await fetch(url, { credentials: "include" });
      if (response.ok) {
          const userData = await response.json()
          setUserId(userData)
      }
  }
  getUserdata()

}, [])

  return (
  <UserContext.Provider value={{
    userId, setUserId
  }}>
  <AuthProvider>
    <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="kindler" element ={<Kindler/>} />
            <Route path="/" element={<MainPage />} />
            <Route path="intro" element={<IntroPage />} />
            <Route path="userhome" element={<UserHomepage />} />
            <Route path="profile/:id" element={<UserProfile />} />
            <Route path="login" element={<LogIn />} />
            <Route path="logout" element={<LogOut />} />
            <Route path="signup" element={<Signup />} />
            <Route path="events" element={<EventList />} />
            <Route path="activities" element={<ActivitiesList />} />
            <Route path="kindler" element={<Kindler />} />
            <Route path="events">
              <Route path=":dynamicId" element={<EventDetail />} />
              <Route path="create" element={<CreateEvent/>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
    </UserContext.Provider>
  )
}
