import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="footer"> {/* Added id="footer" */}
      <div className="footer-content">
        <h3>Tasty Recipe</h3>
        <p>Delicious recipes at your fingertips. Cook, Enjoy, and Share!</p>
        <div className="social-icons">
          <a href="https://www.instagram.com/sathiyamoorthi9213?igsh=MWk3d3pzdWF0MWt0NA==" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram"></i> {/* Instagram Icon */}
          </a>
          <a href="https://www.facebook.com/profile.php?id=100060932026777" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook"></i> {/* Facebook Icon */}
          </a>
        </div>
        <p>&copy; 2025 Tasty Recipe. All rights reserved.</p>
        <p>Created by <strong>Sathiyamoorthi S</strong></p>
        <p>Contact: <a href="mailto:sathiyamcomputer3@gmail.com">sathiyamcomputer3@gmail.com</a></p>
      </div>
    </footer>
  );
};

export default Footer;
