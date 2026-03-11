import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false)
    if (isHome) {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/uzitweaks-site/#${sectionId}`
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-bracket">[</span>
          <span className="logo-text">UZI</span>
          <span className="logo-accent">TWEAKS</span>
          <span className="logo-bracket">]</span>
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <button onClick={() => handleNavClick('features')}>Features</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('results')}>Results</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('comparison')}>Compare</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('pricing')}>Pricing</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('faq')}>FAQ</button>
          </li>
          <li>
            <button
              className="nav-cta"
              onClick={() => handleNavClick('pricing')}
            >
              Buy Now
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
