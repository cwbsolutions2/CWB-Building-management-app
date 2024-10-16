import React from 'react';
import './Dropdown.css'; // Import the CSS file for styling

const Dropdown = ({ dropdownItems, isOpen, toggleDropDown }) => { // Accept props for items, open state, and toggle function
  return (
    <div className='dropdown'>
      <div className='dropdown-header'>
      </div>

      <div className={`dropdown-middle ${isOpen ? 'dropdown-open' : 'dropdown-not-open'}`}> {/* Use isOpen prop to control dropdown visibility */}
        {isOpen && ( // Conditionally render the dropdown items based on isOpen prop
          <ul>
            {dropdownItems.map((item, index) => ( // Map over the dropdown items
              <li key={index} style={{ '--index': index }}> {/* Custom CSS variable for animations */}
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
