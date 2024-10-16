import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserModification from './User Modification/UserModification';
import SidebarMenu from './SidebarMenu/SidebarMenu';

function App() {







  
  return (
    <Router>
      <SidebarMenu />

      <Routes>
        <Route path="/" element={<UserModification />} />

        <Route path="/CWB-Parking-Application" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
