import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserModification from './User Modification/UserModification';
import SidebarMenu from './SidebarMenu/SidebarMenu';


function App() {
  return (







    <Router>

      {<SidebarMenu/>}


      
      <Routes>
        <Route path='/' element={<UserModification />} />
      </Routes>

    </Router>
    
  );
}

export default App;
