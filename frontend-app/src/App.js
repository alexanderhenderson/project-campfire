import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserHomepage from "./UserHomepage";
import MainPage from "./MainHomepage";
import Events from "./Components/EventCard";
// import { AuthProvider } from "./Auth";

function App() {
  return (
    // <AuthProvider>
    <BrowserRouter>
      {/* <Nav /> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="User">
            <Route path="homepage" element={<UserHomepage />} />
            {/* <Route path="new" element={<CreateAuto/>} /> */}
          </Route>
          <Route path="Events">
            {/* <Route path="create" element={<CreateEvent/>} /> */}
            {/* <Route path="list" element={<EventsList/>} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    // </AuthProvider>
  );
}
export default App;
