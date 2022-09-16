import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./Authorization"
import IntroPage from "./IntroPage"
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
import CreateEvent from'./CreateEvent'
import { UserContext } from "./UserContext"
import { useState, useEffect } from "react"
import EditProfile from "./EditProfile"

export default function App() {
  const domain = /https:\/\/[^/]+/
  const basename = process.env.PUBLIC_URL.replace(domain, '')
  

  const [userId, setUserId] = useState('')

  useEffect(() => {
    const getUserdata = async () => {
        const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`;
        const response = await fetch(url, { credentials: "include" });
        if (response.ok) {
            const userData = await response.json()
            setUserId(await userData)
        }
    }
    getUserdata()

  }, [])
  console.log("userId ", userId)
  return (
  <UserContext.Provider value={{
    userId, setUserId
  }}>
  <AuthProvider>
    <BrowserRouter basename={basename}>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="kindler" element ={<Kindler/>} />
            <Route path="/" element={<MainPage />} />
            <Route path="intro" element={<IntroPage />} />
            <Route path="profile/:id" element={<UserProfile />} />
            <Route path="profile/edit/:id" element={<EditProfile />} />
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
