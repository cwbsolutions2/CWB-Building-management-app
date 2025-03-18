import './Forgot Password.css'
import backdropLandingPage from '../assets/Backdrops/Landing page backdrop.jpeg'
import cwbLogo from '../assets/CWB Logo.png'
import { Link } from 'react-router-dom'


const ForgotPassword = () =>{

    return(
        <div className='forgot-password-container'>
            <img id='landing-page-backdrop' src={backdropLandingPage} alt="Landing Page backdrop" />

            <div className='login-signup-box-container'>
                <div className='login-signup-box'>
                    <img src={cwbLogo} alt=""  className='logo'/>
                    <h2>Password Reset</h2>

                    <form>
                        <div className="input-field">
                            <input type="text" id="username" name="username" placeholder='Enter your email'/>
                            <i classname="far fa-user custom-icon-user"></i>
                        </div>

                        <span style={{color:'white', fontWeight:"bold"}}>Enter your email address to receive the OTP and proceed with resetting your password.</span>

                        <button type="submit" class="login-btn">Reset Password</button>

                        <p>Procced to Login ? <Link to={'/home'}>Log in</Link></p>
                    
                        
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword