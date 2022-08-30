import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import UserProfile from './UserProfile';


function App() {
  return (
    <BrowserRouter>
      <UserProfile />
    </BrowserRouter>
  );
}

export default App;
