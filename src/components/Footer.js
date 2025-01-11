import React from 'react';
import './Footer.css'; // Import the external CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'; // Import missing icons

const Footer = () => {
  return (
    <footer className="footer">
        <hr />

      <div className="social-icons fs-1">
        <h1>FOLLOW US</h1>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
      <hr className='hr'/>

      <div className="store-details fs-5">
        <p><strong>Store Details</strong></p>
        <p>Pick & Win Store</p>
        <p>Indore,India</p>
      </div>
      <hr className='hr'/>

      <div className="quick-links ">
        <p><strong className='fs-5'>Quick Links</strong></p>
        <a href="#">MYSTERY BOX</a> |
        <a href="#">Win iPhone</a> |
        <a href="#">Phase 27 Results</a> |
        <a href="#">Contact Us</a> |
        <a href="#">Terms & Conditions</a> |
        <a href="#">Privacy Policy</a> |
        <a href="#">Shipping Policy</a> |
        <a href="#">Refund Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
