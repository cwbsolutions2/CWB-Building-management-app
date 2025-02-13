import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserModification from './User Modification/UserModification';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import Home from './Home/Home';
import GateManagement from './GateManagement/GateManagement';
import LocationManagement from './LocationManagement/Location';

function App() {







  
  return (
    <Router>
      <SidebarMenu />

      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/userModification" element={<UserModification />} />
        <Route path="/gateManagement" element={<GateManagement/>}/>
        <Route path="/locationManagement" element={<LocationManagement/>} />
      </Routes>
    </Router>
  );
}

export default App;
