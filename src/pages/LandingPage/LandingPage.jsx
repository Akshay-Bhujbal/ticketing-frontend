import React, { useState } from 'react';
import styles from './LandingPage.module.css'
import Chatbot from '../Chatbot/Chatbot'; 
import applogo from '../../assets/images/applogo.png'
import play from '../../assets/images/play.png'
import hero1 from '../../assets/images/hero1.png'
import hero2 from '../../assets/images/hero2.png'
import hero3 from '../../assets/images/hero3.png'
import hero4 from '../../assets/images/hero4.png'
import hero5 from '../../assets/images/hero5.png'
import hero6 from '../../assets/images/hero6.png'
import logo1 from '../../assets/images/logo1.png'
import logo2 from '../../assets/images/logo2.png'
import logo3 from '../../assets/images/logo3.png'
import logo4 from '../../assets/images/logo4.png'
import logo5 from '../../assets/images/logo5.png'
import tick from '../../assets/images/tick.png'
import icon1 from '../../assets/images/media1.png'
import icon2 from '../../assets/images/media2.png'
import icon3 from '../../assets/images/media3.png'
import icon4 from '../../assets/images/media4.png'
import icon5 from '../../assets/images/media5.png'
import icon6 from '../../assets/images/media6.png'
import icon7 from '../../assets/images/media7.png'
import support from '../../assets/images/support.png'

import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
	const navigate = useNavigate();

	const [showSupport, setShowSupport] = useState(false);


  return (
    <div className={styles.landingpage}>
        <div className={styles.navbar}>
            <div >
                <img className={styles.applogo} src={applogo} alt="app-logo" />
            </div>
            <div className={styles.signButtons}>
                <button onClick={() => navigate('/auth?mode=login')} className={styles.loginbutton}>Login</button>
                <button onClick={() => navigate('/auth?mode=signup')} className={styles.signupbutton}>Sign up</button>
            </div>
        </div>

        <div className={styles.heroSection1}>
			<div className={styles.heroText}>
				<h1>Grow Your Business Faster <br /> with Hubly CRM</h1>
				<p>Manage leads, automate workflows, and close deals effortlessly—all in one powerful <br /> platform.</p>
				<div className={styles.videoSection}>
					<button className={styles.startButton}>Get Started  &#8594;</button>
					<div className={styles.watch}>
						<img className={styles.play} src={play} alt="play" />
						<span>Watch Video</span>
					</div>
				</div>	
			</div>
			<div className={styles.heroImg}>
				<img className={styles.hero1} src={hero1} alt="heroimg1" />
				<img className={styles.hero2}  src={hero2} alt="heroimg2" />
				<img className={styles.hero3}  src={hero3} alt="heroimg3" />
				<img className={styles.hero4}  src={hero4} alt="heroimg4" />
			</div>
        </div>

		<div className={styles.logoSection}>
			<img className={styles.logo} src={logo1} alt="logo" />
			<img className={styles.logo} src={logo2} alt="logo" />
			<img className={styles.logo} src={logo3} alt="logo" />
			<img className={styles.logo} src={logo4} alt="logo" />
			<img className={styles.logo} src={logo2} alt="logo" />
			<img className={styles.logo} src={logo5} alt="logo" />
		</div>

		<div className={styles.hublySection}>
			<h1>At its core, Hubly is a robust CRM <br /> solution.</h1>
			<p>Hubly helps businesses streamline customer interactions, track leads, and automate tasks—saving you time and maximizing revenue. Whether you’re a startup or an enterprise, Hubly adapts to your needs, giving you the tools to scale efficiently.</p>
		</div>

		<div className={styles.heroSection2}>
			<div className={styles.hero2Text}>
				<h1>MULTIPLE PLATFORMS TOGETHER!</h1>
				<p className={styles.h1p}>Email communication is a breeze with our fully integrated, drag & drop email builder.</p>
				<h2>CLOSE</h2>
				<p>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p>
				<h2>NURTURE</h2>
				<p>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p>

			</div>
			<div className={styles.hero2Img}>
				<img className={styles.hero5}  src={hero5} alt="heroimg5" />
				<img className={styles.hero6}  src={hero6} alt="heroimg6" />
			</div>
		</div>

		<div className={styles.planSection}>
			<div className={styles.planText}>
				<h1>We have plans for everyone!</h1>
				<p>We started with a strong foundation, then simply built all of the sales and marketing tools ALL businesses need under one platform.</p>
			</div>
			<div className={styles.plancard}>
				<div className={styles.card}>
					<h1>STARTER</h1>
					<p>Best for local businesses needing to improve their online reputation.</p>
					<p className={styles.spanp}><span>$199</span>/monthly</p>
					<h5>What’s included</h5>
					<ul className={styles.features}>
						<li><img src={tick} alt="Tick"/> Unlimited Users</li>
						<li><img src={tick} alt="Tick"/> GMB Messaging</li>
						<li><img src={tick} alt="Tick"/> Reputation Management</li>
						<li><img src={tick} alt="Tick"/> GMB Call Tracking</li>
						<li><img src={tick} alt="Tick"/> 24/7 Award Winning Support</li>
					</ul>
					<button className={styles.cardButton}>SIGN UP FOR STARTER</button>
				</div>
				<div className={styles.card}>
					<h1>GROW</h1>
					<p>Best for all businesses that want to take full control of their marketing automation and track their leads, click to close.</p>
					<p><span>$399</span>/monthly</p>
					<h5>What’s included</h5>
					<ul className={styles.features}>
						<li><img src={tick} alt="Tick"/> Pipeline Management</li>
						<li><img src={tick} alt="Tick"/> Marketing Automation Campaigns</li>
						<li><img src={tick} alt="Tick"/> Live Call Transfer</li>
						<li><img src={tick} alt="Tick"/> GMB Messaging</li>
						<li><img src={tick} alt="Tick"/> Embed-able Form Builder</li>
						<li><img src={tick} alt="Tick"/> Reputation Management</li>
						<li><img src={tick} alt="Tick"/> 24/7 Award Winning Support</li>
					</ul>
					<button className={styles.cardButton}>SIGN UP FOR STARTER</button>
				</div>
					
			</div>		
		</div>

		<div className={styles.footerSection}>
			<div className={styles.footerLeft}>
				<img className={styles.applogo} src={applogo} alt="applogo" />
			</div>
			<div className={styles.footerRight}>
				<div className={styles.footerGrid}>
					<div className={styles.footerItem}>
						<h4>Product</h4>
						<ul>
							<li>Universal checkout</li>
							<li>Payment workflows</li>
							<li>Observability</li>
							<li>UpliftAI</li>
							<li>Apps & integrations</li>
						</ul>
					</div>
					<div className={styles.footerItem}>
						<h4>Why Primer</h4>
						<ul>
							<li>Expand to new markets</li>
							<li>Boost payment success</li>
							<li>Improve conversion rates</li>
							<li>Reduce payments fraud</li>
							<li>Recover revenue</li>
						</ul>
					</div>
					<div className={styles.footerItem}>
						<h4>Developers</h4>
						<ul>
							<li>Primer Docs</li>
							<li>API Reference</li>
							<li>Payment methods guide</li>
							<li>Service status</li>
							<li>Community</li>
						</ul>
					</div>
					<div className={styles.footerItem}>
						<h4>Resources</h4>
						<ul>
							<li>Blog</li>
							<li>Success stories</li>
							<li>News room</li>
							<li>Terms</li>
							<li>Privacy</li>
						</ul>
					</div>
					<div className={styles.footerItem}>
						<h4>Company</h4>
						<ul>
							<li>Careers</li>
						</ul>
					</div>
					<div className={styles.footeritem}>
						<div class={styles.icons}>
							<img src={icon1} alt="icon" />
							<img src={icon2} alt="icon" />
							<img src={icon3} alt="icon" />
							<img src={icon4} alt="icon" />
							<img src={icon5} alt="icon" />
							<img src={icon6} alt="icon" />
							<img src={icon7} alt="icon" />
						</div>
      				</div>	
				</div>
			</div>
		</div>

		{showSupport && <Chatbot />}
		
		<div className={styles.supportIcon} onClick={() => setShowSupport(!showSupport)}>
        	<img src={support} alt="Support" />
      </div>

    </div>
  )
}

export default LandingPage