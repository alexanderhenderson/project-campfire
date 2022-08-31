import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import UserHomepage from './UserHomepage';
import ActivitiesList from './ActivitiesList';
import EventDetail from './EventDetail';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          {/* <Route path="/" element={<Mainpage/>} /> */}
          <Route path="User">
            <Route path="homepage" element={<UserHomepage/>} />
            <Route path="profile" element={<UserProfile />} />
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
  );
}
export default App;