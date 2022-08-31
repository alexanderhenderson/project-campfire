import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import UserHomepage from './UserHomepage';
import LogIn from './login';
import LogOut from './logout';
import { AuthProvider } from "./Authorization";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <Nav /> */}
        <div className="container">
          <Routes>
            {/* <Route path="/" element={<Mainpage/>} /> */}
            <Route path="User">
              <Route path="homepage" element={<UserHomepage/>} />
              <Route path="Login" element={< LogIn />} />
              <Route path="Logout" element={< LogOut />} />
              {/* <Route path="new" element={<CreateAuto/>} /> */}
            </Route>
            <Route path="Events">
              {/* <Route path="create" element={<CreateEvent/>} /> */}
              {/* <Route path="list" element={<EventsList/>} /> */}
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>

  );
}
export default App;