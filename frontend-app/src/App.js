import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import UserHomepage from './UserHomepage';

function App() {
  return (
    <BrowserRouter>
      {/* <Nav /> */}
      <div className="container">
        <Routes>
          {/* <Route path="/" element={<Mainpage/>} /> */}
          <Route path="User">
            <Route path="homepage" element={<UserHomepage/>} />
            {/* <Route path="new" element={<CreateAuto/>} /> */}
          </Route>
          <Route path="Events">
            {/* <Route path="create" element={<CreateEvent/>} /> */}
            {/* <Route path="list" element={<EventsList/>} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;