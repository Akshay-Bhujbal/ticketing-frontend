import React, {useState} from 'react'
import {useLocation, Link, useNavigate} from 'react-router-dom'
import axiosInstance from '../../utils/axios';
import styles from './AuthPage.module.css'
import formimg from '../../assets/images/formimg.png'
import applogo from '../../assets/images/applogo.png'


const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search)
  const mode = queryParams.get("mode") || "signup"

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const {firstName, lastName, email, password, confirmPassword} = signupData;

  const {email: username, password: loginpassword} = loginData;

  const handleSignupChange = (e) => {
    setSignupData({...signupData, [e.target.name]: e.target.value});
  };

  const handleLoginChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value});
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axiosInstance.post('http://localhost:5000/api/auth/signup', signupData);
      console.log(res.data);
      alert('Signup successful! Please login.');
      navigate('/auth?mode=login');
    } catch (error) {
      console.log(error);
      alert('Signup failed');
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('http://localhost:5000/api/auth/login', {email: username, password: loginpassword});
      console.log(res.data)

      localStorage.setItem('token', res.data.token);

      navigate('/dashboard')
    } catch (error) {
        console.error(error);
        alert('Login failed');
    }
  };

  return (
    <div className={styles.authpage}>
        <div className={styles.authLeft}>
            <img className={styles.applogo} src={applogo} alt="applogo" />
            {mode === 'signup' ? (
              <form className={styles.signupForm} onSubmit={handleSignupSubmit}>
                <div className={styles.signupHeader}>
                  <h2>Create an account</h2>
                  <Link to="/auth?mode=login">Sign in instead</Link>
                </div>
                <div>
                  <label className={styles.label}>First name</label> <br />
                  <input className={styles.inputBox} type="text" name='firstName' value={firstName} onChange={handleSignupChange} /> <br />

                  <label className={styles.label} >Last name</label> <br />
                  <input className={styles.inputBox} type="text"  name='lastName' value={lastName} onChange={handleSignupChange} /> <br />

                  <label className={styles.label} >Email</label> <br />
                  <input className={styles.inputBox} type="email" name='email' value={email} onChange={handleSignupChange} /> <br />

                  <label className={styles.label} >Password</label> <br />
                  <input className={styles.inputBox} type="password" name="password" value={password} onChange={handleSignupChange} /> <br />

                  <label className={styles.label} >Confirm Password</label> <br />
                  <input className={styles.inputBox} type="password" name="confirmPassword" value={confirmPassword} onChange={handleSignupChange} /> <br />

                  <div className={styles.agree}>
                    <input type="checkbox" />
                    <label htmlFor="">
                    By creating an account, I agree to our Terms of use 
                    and Privacy Policy 
                    </label>
                  </div>
                  <button className={styles.signupButton} type='submit'>Create an account</button>
                </div>
              </form>
            ) : (
              <form className={styles.loginForm} onSubmit={handleLoginSubmit}>
                <div className={styles.signinHeader}>
                  <h2>Sign in to your Plexify</h2>
                </div>
                <div>
                  <label className={styles.label} >Username</label> <br />
                  <input className={styles.inputLogin} type="email" name='email' placeholder='email' value={username} onChange={handleLoginChange} /> <br />

                  <label className={styles.label} >Password</label> <br />
                  <input className={styles.inputLogin} type="password" name="password" placeholder='password' value={loginpassword} onChange={handleLoginChange} /> <br />

                  <button className={styles.loginButton} type='submit'>Log in</button>

                </div>
                <div className={styles.switchForm}>
                  <p>Don't have an account?</p>
                  <Link to="/auth?mode=signup">Sign up</Link>
                </div>
              </form>
            )}
            <p className={styles.terms}>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
        </div>
        <div className={styles.imageSection}>
            <img className={styles.formImg} src={formimg} alt="form-img" />
        </div>
    </div>
  )
}

export default AuthPage