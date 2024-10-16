import React, { useState, useRef } from 'react';
import './SidebarMenu.css'; // Import the CSS file
import homeIcon from './Images/home_app_logo.svg';
import adminIcon from './Images/account_circle.svg';
import testAdminIcon from './Images/shield_person.svg';
import hardwareManagemtIcon from './Images/build_circle.svg';
import vehicleIcon from './Images/cars.svg';
import menuIcon from '../../public/menu.svg';

const SidebarMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const touchStartX = useRef(0);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Touch start handler for swipe gestures on mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX; // Save the starting touch position
  };

  // Touch move handler for swiping left to close the sidebar
  const handleTouchMove = (e) => {
    const touchEndX = e.touches[0].clientX;
    const touchDiff = touchEndX - touchStartX.current;

    if (touchDiff < -50 && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div>
      {/* Mobile menu icon to toggle the sidebar */}
      <div className="mobile-menu-icon" >
        <img onClick={toggleSidebar} className="menuIcon" src={menuIcon} alt="Menu Icon" style={{ width: '30px' }} />
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar ${isSidebarOpen ? 'open-sidebar' : 'hidden-sidebar'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="sidebar-logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" className="logo" />
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <span className="menu-icon"><img src={homeIcon} alt="Home Icon" /></span>
            <span className="menu-text">Home</span>
          </li>
          <li className="menu-item">
            <span className="menu-icon"><img src={vehicleIcon} alt="Vehicle Icon" /></span>
            <span className="menu-text">Driver/Vehicle</span>
          </li>
          <li className="menu-item">
            <span className="menu-icon"><img src={adminIcon} alt="Admin Icon" /></span>
            <span className="menu-text">Administrators</span>
          </li>
          <li className="menu-item">
            <span className="menu-icon"><img src={hardwareManagemtIcon} alt="Hardware Management Icon" /></span>
            <span className="menu-text">Hardware Management</span>
          </li>
          <li className="menu-item">
            <span className="menu-icon"><img src={testAdminIcon} alt="Test Admin Icon" /></span>
            <span className="menu-text">Test Admin</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
