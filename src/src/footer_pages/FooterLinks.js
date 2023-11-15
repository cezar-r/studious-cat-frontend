import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/footer_pages/footer.css';


function FooterLinks() {
    return (
        <div className="footer-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
        </div>
    );
}

export default FooterLinks;