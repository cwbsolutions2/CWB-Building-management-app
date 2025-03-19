import './Forgot Password.css'
import backdropLandingPage from '../assets/Backdrops/Landing page backdrop.jpeg'
import cwbLogo from '../assets/CWB Logo.png'
import { Link } from 'react-router-dom'
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes countdown
    const [canResend, setCanResend] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordResetForm, setShowPasswordResetForm] = useState(false); // New state for showing password reset form
    const navigate = useNavigate();
    
    useEffect(() => {
        let timer;
        if (showPopUp && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setCanResend(true);
        }
        return () => clearInterval(timer);
    }, [showPopUp, timeLeft]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://47.129.53.168:5000/send-otp', { email });

            toast.success("OTP sent successfully!", {
                position: "top-right",
                autoClose: 4500,
            });

            setShowPopUp(true);
            setTimeLeft(180);
            setCanResend(false);

        } catch (err) {
            toast.error("Failed to send OTP", { autoClose: 4500 });
        }
    }

    const handleResendOTP = async () => {
        try {
            await axios.post('http://47.129.53.168:5000/send-otp', { email });

            toast.success("New OTP sent!", { position: "top-right", autoClose: 4500 });

            setTimeLeft(180);
            setCanResend(false);

        } catch (err) {
            toast.error("Failed to resend OTP", { autoClose: 4500 });
        }
    }

    const handleOTPSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://47.129.53.168:5000/verify-otp', { email, otp });

            if (response.data.success) {
                toast.success("OTP Verified! Please enter a new password.", { autoClose: 4500 });

                // Update state to show the password reset form
                setShowPopUp(false); // Hide OTP form
                setShowPasswordResetForm(true); // Show the password reset form
                
            } else {
                toast.error("Invalid OTP. Try again.", { autoClose: 4500 });
            }

        } catch (err) {
            toast.error("Invalid OTP.", { autoClose: 4500 });
        }

        setOtp(" ");
    }

    const sendOTPForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="input-field">
                <input 
                    type="email" 
                    placeholder='Enter your email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
            </div>

            <span style={{ color: 'white', fontWeight: "bold" }}>
                Enter your email to receive an OTP for password reset.
            </span>

            <button type='submit' className="login-btn">Send OTP</button>

            <p>Proceed to Login? <Link to={'/home'}>Log in</Link></p>
        </form>
    );

    const verifyOTPForm = () => (
        <form onSubmit={handleOTPSubmit}>
            <div className="input-field">
                <input 
                    type="text" 
                    placeholder='Enter OTP' 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    required
                />
            </div>

            {timeLeft !== 0 ? (
                <span style={{ color: 'white', fontWeight: "bold" }}>
                    OTP valid for: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </span>
            ) : (
                <span style={{ color: 'red', fontWeight: "bold" }}>
                    OTP Expired!
                </span>
            )}

            <button 
                disabled={timeLeft === 0} 
                type='submit'  
                className="login-btn">
                {timeLeft!==0 ? "Verify OTP":"Request a new OTP to verify"} 
            </button>

            <button 
                type="button" 
                className="resend-btn" 
                onClick={handleResendOTP} 
                disabled={!canResend}
            >
                {canResend ? "Resend OTP" : "Wait to resend"}
            </button>
        </form>
    );

    const validatePassword = (password) => {
        const hasNumber = /\d/; // Checks for at least one number
        const hasLowercase = /[a-z]/; // Checks for at least one lowercase letter
        const hasUppercase = /[A-Z]/; // Checks for at least one uppercase letter

        return hasNumber.test(password) && hasLowercase.test(password) && hasUppercase.test(password);
    }

    const handlePasswordResetSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            setPassword(''); // Corrected to setPassword
            setConfirmPassword(''); // Corrected to setConfirmPassword
            return;
        }
    
        if (password.length < 8 || password.length > 30) {
            alert('Invalid Length!');
            setPassword(''); // Corrected to setPassword
            setConfirmPassword(''); // Corrected to setConfirmPassword
            return;
        }
    
        if (!validatePassword(password)) {
            alert('Password must contain at least one number, one lowercase letter, and one uppercase letter.');
            setPassword(''); // Corrected to setPassword
            setConfirmPassword(''); // Corrected to setConfirmPassword
            return;
        }
    
        try {
            const response = await axios.post('http://47.129.53.168:5000/reset-password', {
                email,
                password
            });
    
            Swal.fire({
                title: "Password Changed Successfully!",
                text: "Please Proceed to Login",
                icon: "success"
            });

            navigate('/home');
    
        } catch (error) {
            console.error('Password reset failed', error); // Added logging for better error handling
            Swal.fire({
                title: "Password Reset Failed!",
                text: "Please try again!",
                icon: "error"
            });
        }
    
        setEmail(""); // If needed to reset the email field
        setPassword(''); // Corrected to setPassword
        setConfirmPassword(''); // Corrected to setConfirmPassword
    }

    const passwordResetForm = () => {
        return(
            <form onSubmit={handlePasswordResetSubmit}>
                <label> New Password</label>
                <div className='input-field'>
                    <input 
                        type="password" 
                        name='password'
                        id='password'
                        value={password}
                        placeholder='Enter password'
                        required
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </div>

                <label>Confirm New Password</label>
                <div className='input-field'>
                    <input 
                        type="password" 
                        name='confirm-password'
                        id='confirm-password'
                        value={confirmPassword}
                        placeholder='Re-enter password'
                        required
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    />
                </div>

                <div style={{ textAlign: 'left' }}>
                    <span style={{ color: 'white', fontSize:"0.9em" }}>
                        * Password must contain 8-30 characters, including a number, a lowercase, and an uppercase letter.
                    </span>
                </div>
            
                <button type="submit" className="login-btn">Change Password</button>
            </form>
        )
    }

    return (
        <div className='forgot-password-container'>
            <ToastContainer />
            <img id='landing-page-backdrop' src={backdropLandingPage} alt="Landing Page backdrop" />

            <div className='login-signup-box-container'>
                <div className='login-signup-box'>
                    <img src={cwbLogo} alt="" className='logo' />
                    <h2>Password Reset</h2>

                    {showPasswordResetForm ? passwordResetForm() : showPopUp ? verifyOTPForm() : sendOTPForm()}
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
