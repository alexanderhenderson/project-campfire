import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./Authorization"
import MainPage from "./MainHomepage"
import UserHomepage from "./UserHomepage"
import Nav from './Nav'
import UserProfile from './UserProfile'
import LogIn from './login'
import LogOut from './logout'
import Signup from "./SignUp"
import EventList from './EventPage'
import ActivitiesList from './ActivitiesList'
import EventDetail from './EventDetail'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="home" element={<UserHomepage />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="login" element={<LogIn />} />
            <Route path="logout" element={<LogOut />} />
            <Route path="signup" element={<Signup />} />
            <Route path="events" element={<EventList />} />
            <Route path="Events">
              <Route path="detail" element={<EventDetail />} />
              {/* <Route path="create" element={<CreateEvent />} /> */}
            </Route>
            <Route path="activities" element={<ActivitiesList />} />
            <Route path="Activities">
              {/* <Route path="create" element={<CreateActivity/>} /> */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
