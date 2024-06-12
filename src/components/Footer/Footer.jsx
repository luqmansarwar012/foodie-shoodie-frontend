import { assets } from '../../assets/assets'
import './Footer.css'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <h2><span>Foodie</span>Shoodie</h2>
                    <p>Celebrate your love for great food with Foodie Shoodie, your ultimate culinary companion! Discover a world of delicious possibilities as we bring the finest flavors straight to your doorstep. From tantalizing treats to hearty meals, embark on a flavorful journey with our easy-to-use app.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delievery</li>
                        <li>Privacy & Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <ul>
                        <li>+92 333 3333</li>
                        <li>foodie-shoodie@gmail.com</li>
                        <li>Developer: <a href="https://github.com/luqmansarwar012">Luqman Sarwar.</a></li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footeer-copyright">Copyright 2024 &copy; foodieshoodie.com - All Rights Reserved</p>
        </div>
    )
}

export default Footer