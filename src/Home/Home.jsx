import './Home.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import backdropLandingPage from '../assets/Backdrops/Landing page backdrop.jpeg'
import cwbLogo from '../assets/CWB Logo.png'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import Swal from 'sweetalert2';

const Home = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await axios.post('http://47.129.53.168:5000/login', {
                email,
                password
            });

            console.log(email);
            console.log(password);

            // Set loading to false once the response is received
            setLoading(false);

            // Show success alert
            Swal.fire({
                title: "Successful Login!",
                text: "You will be redirected shortly",
                icon: "success"
            });

            // You can do something with the response here, like redirecting the user
            console.log(response.data);

        } catch (error) {
            setLoading(false); // Ensure loading is stopped in case of error
            console.error("Error during login:", error);

            // Show error alert
            Swal.fire({
                title: "Login Error!",
                text: "Invalid Email or Password",
                icon: "error"
            });
        }

        // Correctly clear the input fields
        setEmail("");
        setPassword("");
    }

    return (
        <div className='homePageContainer'>
            <ToastContainer />
            <img id='landing-page-backdrop' src={backdropLandingPage} alt="Landing Page backdrop" />

            <div className='login-signup-box-container'>
                <div className='login-signup-box'>
                    <img src={cwbLogo} alt="" className='logo' />
                    <h2>Welcome to your building</h2>
                    <h2>management system!</h2>
                    <h1>Parking</h1>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <div className="input-field">
                            <input 
                                value={email}
                                type='email'
                                name="email"
                                id='email'
                                placeholder="Enter your email"
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                            />
                            <i className="far fa-user custom-icon-user"></i>
                        </div>

                        <label htmlFor="password">Password</label>
                        <div className="input-field">
                            <input 
                                type="password" 
                                name='password'
                                id='password'
                                value={password}
                                placeholder='Enter password'
                                required
                                onChange={(e) => { setPassword(e.target.value) }} />
                            <i className="fas fa-lock custom-icon-lock"></i>
                        </div>

                        <div className="options">
                            <Link className="forgot-password" to={'/forgotPassword'}>Forgot password?</Link>
                            {/* <div className="remember-me">
                                <input type="checkbox" id="remember"/>
                                <label htmlFor="remember">Remember me</label>
                            </div> */}
                        </div>

                        <button type="submit" className="login-btn">
                            {loading ? "Logging in....." : "Login"}
                        </button>
                        <p className="register">Don't have an account? <Link to={"/signup"}>Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home;
