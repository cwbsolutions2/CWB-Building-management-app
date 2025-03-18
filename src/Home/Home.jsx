import './Home.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import backdropLandingPage from '../assets/Backdrops/Landing page backdrop.jpeg'
import cwbLogo from '../assets/CWB Logo.png'
import { Link } from "react-router-dom";



const Home =() =>{

    return(
        <div className='homePageContainer'>
            <img id='landing-page-backdrop' src={backdropLandingPage} alt="Landing Page backdrop" />
                
                <div className='login-signup-box-container'>
                    <div className='login-signup-box'>
                        <img src={cwbLogo} alt=""  className='logo'/>
                        <h2>Welcome to your building</h2>
                        <h2> management system!</h2>
                        <h1>Parking</h1>

                        <form>
                            <label for="username">Username</label>
                            <div className="input-field">
                                <input type="text" id="username" name="username" placeholder='Enter your email'/>
                                <i classname="far fa-user custom-icon-user"></i>
                            </div>

                            <label for="password">Password</label>
                            <div class="input-field">
                                <input type="password" id="password" name="password" placeholder='Enter your password'/>
                                <i classname="fas fa-lock custom-icon-lock"></i>
                            </div>

                            <div class="options">
                                <Link  class="forgot-password" to={'/forgotPassword'}>Forgot password?</Link>
                                {/*<div class="remember-me">
                                    <input type="checkbox" id="remember"/>
                                    <label for="remember">Remember me</label>
                                </div> */}
                            </div>

                            <button type="submit" class="login-btn">Login</button>
                            <p className="register">Don't have an account? <Link to={"/signup"}>Register</Link></p>
                            
                        </form>
                    </div>
                </div>

        </div>
    )
}

export default Home;