import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserHomepage from "./UserHomepage";
import MainPage from "./MainHomepage";
import Events from "./Components/EventCard";
// import { AuthProvider } from "./Auth";
import UserProfile from './UserProfile';
// import UserHomepage from './UserHomepage';
import LogIn from './login';
import LogOut from './logout';
import { AuthProvider } from "./Authorization";
import ActivitiesList from './ActivitiesList';
import EventDetail from './EventDetail';
import Nav from './Nav';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="User">
              <Route path="homepage" element={<UserHomepage/>} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="Login" element={< LogIn />} />
              <Route path="Logout" element={< LogOut />} />
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
