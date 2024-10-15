import React, { useState, useRef } from 'react';
import './SidebarMenu.css'; // Import CSS for sidebar styling
import homeIcon from './Images/home_app_logo.svg';
import adminIcon from './Images/account_circle.svg';
import testAdminIcon from './Images/shield_person.svg';
import hardwareManagemtIcon from './Images/build_circle.svg';
import vehicleIcon from './Images/cars.svg';
import menuIcon from '../../public/menu.svg';

const SidebarMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const touchStartX = useRef(0);

  // Function to toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Touch start event handler
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX; // Save the starting touch position
  };

  // Touch move event handler
  const handleTouchMove = (e) => {
    const touchEndX = e.touches[0].clientX;
    const touchDiff = touchEndX - touchStartX.current;

    // If swiped left and the sidebar is open, close it
    if (touchDiff < -50 && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div>
      {/* Menu icon for mobile to toggle the sidebar */}
      <div className="mobile-menu-icon" onClick={toggleSidebar}>
        <img className='menuIcon' src={menuIcon} alt="Menu Icon" style={{ width: '30px', cursor: 'pointer' }} />
      </div>

      {/* Sidebar menu */}
      <div
        className={`sidebar ${isSidebarOpen ? 'open' : 'hidden'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="sidebar-logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" className="logo" />
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <span className="menu-icon"><img src={homeIcon} alt="" /></span>
            <span className="menu-text">Home</span>
          </li>
          <li className="menu-item">
            <span className="menu-icon"><img src={vehicleIcon} alt="" /></span>
            <span className="menu-text">Driver/Vehicle</span>
          </li>
          <li className="menu-item">
            <span className="menu-icon"><img src={adminIcon} alt="" /></span>
            <span className="menu-text">Administrators</span>
          </li>
          <li className="menu-item">
            <span className="menu-icon"><img src={hardwareManagemtIcon} alt="" /></span>
            <span className="menu-text">Hardware Management</span>
          </li>
          <li className="menu-item">
            <span className="menu-icon"><img src={testAdminIcon} alt="" /></span>
            <span className="menu-text">Test Admin</span>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default SidebarMenu;
