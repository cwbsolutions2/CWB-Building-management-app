import './Home.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import backdropLandingPage from '../assets/Backdrops/Landing page backdrop.jpeg'
import cwbLogo from '../assets/CWB Logo.png'



const Home =() =>{

    return(
        <div className='homePageContainer'>
            <img id='landing-page-backdrop' src={backdropLandingPage} alt="Landing Page backdrop" />
                
                <div className='login-signup-box-container'>
                    <div className='login-signup-box'>
                        <img src={cwbLogo} alt=""  className='logo'/>
                        <h2>Welcome to your building</h2>
                        <h2> management system!</h2>
                        <h1>PARKING</h1>

                        <form>
                            <label for="username">Username</label>
                            <div class="input-field">
                                <input type="text" id="username" name="username" placeholder='Enter your email'/>
                                <i class="far fa-user custom-icon-user"></i>
                            </div>

                            <label for="password">Password</label>
                            <div class="input-field">
                                <input type="password" id="password" name="password" placeholder='Enter your password'/>
                                <i class="fas fa-lock custom-icon-lock"></i>
                            </div>

                            <div class="options">
                                <a href="#" class="forgot-password">Forgot password?</a>
                                {/*<div class="remember-me">
                                    <input type="checkbox" id="remember"/>
                                    <label for="remember">Remember me</label>
                                </div> */}
                            </div>

                            <button type="submit" class="login-btn">Login</button>
                            <p class="register">Don't have an account? <a href="#">Register</a></p>
                        </form>
                    </div>
                </div>

        </div>
    )
}

export default Home;