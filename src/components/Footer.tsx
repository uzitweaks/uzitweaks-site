import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-bracket">[</span>
              <span className="logo-text">UZI</span>
              <span className="logo-accent">TWEAKS</span>
              <span className="logo-bracket">]</span>
            </Link>
            <p className="footer-tagline">
              Premium Gaming Optimizer for Windows.
              <br />
              Unlock your system's full potential.
            </p>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="mailto:support@uzitweaks.com">Contact</a></li>
              <li><a href="#faq">Help Center</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-line" />
          <p>&copy; {new Date().getFullYear()} UziTweaks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
