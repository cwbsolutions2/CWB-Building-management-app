import './signup.css'
import cwbLogo from '../assets/CWB Logo.png'
import { Link } from 'react-router-dom'
import { CountryDropdown } from 'react-country-region-selector'
import { useState } from 'react'
import backdropLandingPage from '../assets/Backdrops/Landing page backdrop.jpeg'
import { toast,ToastContainer } from 'react-toastify'

const SignUP =() =>{

    const [title, SetTitle] = useState('');
    const [firstName, SetFirstName] =useState('');
    const [secondName, SetLastName] =useState('');
    const [birthday, SetBirthday]=useState('');
    const [country, SetCountry]=useState('');
    const [phoneNumber, SetPhoneNumber]=useState('');
    const [email, SetEmail]= useState('');
    const [password, SetPassword]=useState('');
    const [confirmPassword, SetConfirmPassword]=useState('');
    const [hasTypedConfirmPassword, setHasTypedConfirmPassword] = useState(false);


    const validatePassword = (password) => {
        const hasNumber = /\d/; // Checks for at least one number
        const hasLowercase = /[a-z]/; // Checks for at least one lowercase letter
        const hasUppercase = /[A-Z]/; // Checks for at least one uppercase letter

        return hasNumber.test(password) && hasLowercase.test(password) && hasUppercase.test(password);
    }

    const validateContactNumber =(phoneNumber) =>{
          const hasLowercase = /[a-z]/; // Checks for at least one lowercase letter
          const hasUppercase = /[A-Z]/; // Checks for at least one uppercase letter

          return hasLowercase.test(phoneNumber)||hasUppercase.test(phoneNumber);
          
        }

    const validateBirthday = (birthday)=>{
        const selectedDate = new Date(birthday)
        const currentDate = new Date(); // Current date object
        currentDate.setHours(0, 0, 0, 0); // Reset time for today (only compare dates, not time)

        if (selectedDate>currentDate){
            return 1;
        }else
            return 0;
    }

    const handleSubmit = (e) =>{
        e.preventDefault();     {/* Prevent Page from Reloading*/}

        if(password!==confirmPassword){
            alert('Passwords do not match!');
            SetPassword('');
            SetConfirmPassword('');            
            return;
        }
        if(password.length<8 || password.length>30){
            alert('Invalid Length!');
            SetPassword('');
            SetConfirmPassword('');
            return;
        }
        if(!validatePassword(password)) {
            alert('Password must contain at least one number, one lowercase letter, and one uppercase letter.');
            SetPassword('');
            SetConfirmPassword('');
            return;
        }
        if (validateContactNumber(phoneNumber)) {
            alert('Contact Number must contain only digits!');
            SetPhoneNumber('');
            return;
        }

        if (validateBirthday(birthday)){
            SetBirthday('')
            alert("Birthday should be in the past!")
            return;
        }


        SetFirstName('');
        SetLastName('');
        SetBirthday('');
        SetCountry('');
        SetPhoneNumber('');
        SetEmail('');
        SetPassword('');
        SetConfirmPassword('');
        toast.success("Sign Up Successful!",{
            closeOnClick:true,
            autoClose:2000,
        })

    }

    return(
        <div className='sign-up-prompt-container'>
             <ToastContainer/>
            <img id='landing-page-backdrop' src={backdropLandingPage} alt="Landing Page backdrop" />

            <div className='login-signup-box-container'>
                <div className='login-signup-box'>
                    <img src={cwbLogo} alt=""  className='logo'/>
                    <h2>Welcome to your building</h2>
                    <h2> management system!</h2>
                    <h1>Signup</h1>

                    <form onSubmit={handleSubmit}>

                        <label>Title</label>
                            <select 
                                id='title' 
                                className='input-field' 
                                placeholder="Select title"
                                value={title}
                                required
                                onChange={(e) =>SetTitle(e.target.value)}>
                                    <option value="" disabled>Select Title</option> {/*We use this as place holder option */}
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Miss">Miss</option>  
                                    <option value="Ms">Ms</option>
                            </select>

                        <label> First Name</label>
                        <div className='input-field'>
                            <input 
                                type="text" 
                                id="first-name" 
                                placeholder='Enter your first name'
                                value={firstName}
                                onChange={(e)=> SetFirstName(e.target.value)}
                                required/>
                        </div>

                        <label> Last Name</label>
                        <div className='input-field'>
                            <input 
                                type="text" 
                                id="last-name" 
                                placeholder='Enter your last name'
                                value={secondName}
                                onChange={(e)=> SetLastName(e.target.value)}
                                required/>
                        </div>


                        <label> Date of Birth</label>
                        <div className='input-field'>
                            <input 
                                type="date" 
                                name="date" 
                                id="date-of-birth" 
                                value={birthday} 
                                placeholder="MM/DD/YYYY" 
                                onChange={(e)=>SetBirthday(e.target.value)} 
                                required/>
                        </div>


                        <label >Phone Number</label>
                        <div className='input-field'>
                            <input 
                                type="text" 
                                name="phone-number"
                                id="phone_number"
                                placeholder='Enter mobile number'
                                value={phoneNumber}
                                onChange={(e)=>SetPhoneNumber(e.target.value)}
                                required/>
                        </div>

                        <label>Country</label>
                            <div className='input-field'>
                                <CountryDropdown
                                    id='country'
                                    name='country'
                                    value={country}
                                    onChange={(val) => SetCountry(val)}
                                    required
                                />
                            </div>

                        <label>Email</label>
                            <div className='input-field'>
                                <input 
                                    value={email}
                                    type='email'
                                    name="email"
                                    id='email'
                                    placeholder="Enter your email"
                                    onChange={(e)=>{SetEmail(e.target.value)}}
                                    required
                                />
                                
                            </div>

                        <label>Password</label>
                            <div className='input-field'>
                                <input 
                                    type="password" 
                                    name='password'
                                    id='password'
                                    value={password}
                                    placeholder='Enter password'
                                    required
                                    onChange={(e)=>{SetPassword(e.target.value)}}/>
                            </div>

                        <label>Confirm Password</label>
                            <div className='input-field'>
                                <input 
                                    type="password" 
                                    name='confirm-password'
                                    id='confirm-password'
                                    value={confirmPassword}
                                    placeholder='Re-enter password'
                                    required
                                    onChange={(e)=>{SetConfirmPassword(e.target.value);setHasTypedConfirmPassword(true);}}/>
                            </div>

                            <div style={{ textAlign: 'left' }}>
                                <span style={{ color: 'white', fontSize:"0.9em" }}>
                                    * Password must contain 8-30 characters, a number, a lowercase, and an uppercase letter.
                                </span>
                            </div>

                            {hasTypedConfirmPassword && confirmPassword && (password !== confirmPassword) && (
                                <p style={{ color: 'red', fontSize: '14px' }}>Passwords do not match!</p>)}


                        <button type="submit" className="login-btn">Signup</button>
                        
                        <p class="register">Already have an account? <Link to={"/home"}>Log in </Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SignUP