import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import './SidebarMenu.css';
import homeIcon from './Images/home_app_logo.svg';
import adminIcon from './Images/account_circle.svg';
import testAdminIcon from './Images/shield_person.svg';
import hardwareManagementIcon from './Images/build_circle.svg';
import vehicleIcon from './Images/cars.svg';
import menuIcon from '../../public/menu.svg';
import Dropdown from './Dropdown/Dropdown';

const SidebarMenu = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    hardwareManagement: false,
    driverVehicle: false
  });

  const touchStartX = useRef(0);

  // Toggle dropdown visibility
  const toggleDropdown = (dropdownName) => {
    setIsDropdownOpen((prevState) => ({
      hardwareManagement: dropdownName === 'hardwareManagement' ? !prevState.hardwareManagement : false,
      driverVehicle: dropdownName === 'driverVehicle' ? !prevState.driverVehicle : false,
    }));
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false); // Close dropdown if it's open
    }
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

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false); // Close sidebar when location changes
  }, [location]);

  // Handle navigation for dropdown items
  const handleItemClick = (item) => {
    switch (item) {
      case 'Gate Management':
        navigate('/gateManagement');
        break;
      case 'Location Management':
        navigate('/locationManagement');
        break;
      case 'Vehicle Details':
        navigate('/userModification');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {/* Mobile menu icon to toggle the sidebar */}
      <div className="mobile-menu-icon">
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
            <span className="menu-text"><Link to='/home'>Home</Link></span>
          </li>

          <li className={`menu-item ${isDropdownOpen.driverVehicle ? 'open' : ''}`} onClick={() => toggleDropdown('driverVehicle')}>
            <span className="menu-icon"><img src={vehicleIcon} alt="Vehicle Icon" /></span>
            <span className="menu-text">Driver/Vehicle</span>
          </li>

          {isDropdownOpen.driverVehicle && (
            <Dropdown dropdownItems={['Vehicle Details']} isOpen={isDropdownOpen.driverVehicle} toggleDropDown={() => toggleDropdown('driverVehicle')} handleItemClick={handleItemClick} />
          )}

          <li className="menu-item">
            <span className="menu-icon"><img src={adminIcon} alt="Admin Icon" /></span>
            <span className="menu-text">Administrators</span>
          </li>

          <li className={`menu-item ${isDropdownOpen.hardwareManagement ? 'open' : ''}`} onClick={() => toggleDropdown('hardwareManagement')}>
            <span className="menu-icon"><img src={hardwareManagementIcon} alt="Hardware Management Icon" /></span>
            <span className="menu-text">Hardware Management</span>
          </li>

          {isDropdownOpen.hardwareManagement && (
            <Dropdown dropdownItems={['Gate Management', 'Location Management']} isOpen={isDropdownOpen.hardwareManagement} toggleDropDown={() => toggleDropdown('hardwareManagement')} handleItemClick={handleItemClick} />
          )}

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
