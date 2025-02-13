import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserModification from './User Modification/UserModification';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import Home from './Home/Home';
import GateManagement from './GateManagement/GateManagement';
import LocationManagement from './LocationManagement/Location';

function App() {
  return (
    <Router basename="/CWB-Building-management-app">  {/* Use the subdirectory name */}
      <SidebarMenu />
      <Routes>
        {/* Redirect root path to /home */}
        <Route path="/" element={<Navigate to="/home" />} />
        
        {/* Main routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/userModification" element={<UserModification />} />
        <Route path="/gateManagement" element={<GateManagement />} />
        <Route path="/locationManagement" element={<LocationManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
