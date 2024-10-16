import { useState } from 'react'
import './Dropdown.css'

const Dropdown =({dropdownItems}) =>{
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    const toggleDropDown = () =>{
        setDropdownIsOpen(!dropdownIsOpen);
    };

    return (
        <div className='dropdown'>

            <div className='dropdown-header'>
                <button onClick={toggleDropDown}>Click me</button>
            </div>

            <div className='dropdown-middle'>
                {dropdownIsOpen&&(
                    <ul>
                        {dropdownItems.map((item,index) =>(
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                )
                }
            </div>


            

        </div>
    )
};
export default Dropdown;

