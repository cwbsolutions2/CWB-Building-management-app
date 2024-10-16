import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserModification from './User Modification/UserModification';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import Dropdown from './SidebarMenu/Dropdown/Dropdown';

function App() {







  
  return (
    <Router>
      <SidebarMenu />

      <Dropdown
      dropdownItems={['test1','test2','test3']}
      />

      <Routes>
        <Route path="/" element={<UserModification />} />
        {/* Redirect from /CWB-Parking-Application to / */}
        <Route path="/CWB-Parking-Application" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
