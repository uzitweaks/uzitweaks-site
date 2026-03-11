import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import GlowButton from '../components/GlowButton'
import NeonCard from '../components/NeonCard'
import { API_URL } from '../config'
import './SuccessPage.css'

function SuccessPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [licenseKey, setLicenseKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found. Please check your email for your license key.')
      setLoading(false)
      return
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_URL}/api/order?session_id=${sessionId}`)
        if (!res.ok) throw new Error('Failed to fetch order')
        const data = await res.json()
        setLicenseKey(data.license_key || data.licenseKey)
      } catch {
        setError('Could not retrieve your license key. Please contact support with your session ID.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [sessionId])

  const handleCopy = () => {
    if (licenseKey) {
      navigator.clipboard.writeText(licenseKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <main className="success-page">
      <div className="success-glow" />
      <div className="container">
        <div className="success-content">
          {loading ? (
            <div className="success-loading">
              <div className="spinner" />
              <p>Retrieving your license key...</p>
            </div>
          ) : error ? (
            <NeonCard glow="pink" hover={false} className="success-card">
              <div className="success-icon error-icon">!</div>
              <h1>Something Went Wrong</h1>
              <p className="success-message">{error}</p>
              {sessionId && (
                <p className="session-id">
                  Session ID: <code>{sessionId}</code>
                </p>
              )}
              <div className="success-actions">
                <GlowButton variant="pink" onClick={() => window.location.href = 'mailto:support@uzitweaks.com'}>
                  Contact Support
                </GlowButton>
                <Link to="/">
                  <GlowButton variant="cyan" size="sm">Back to Home</GlowButton>
                </Link>
              </div>
            </NeonCard>
          ) : (
            <NeonCard glow="green" hover={false} className="success-card">
              <div className="success-icon">{'\u2713'}</div>
              <h1>Payment <span className="gradient-text">Successful</span>!</h1>
              <p className="success-message">
                Thank you for purchasing UziTweaks. Your lifetime license key is below.
              </p>

              <div className="license-key-box" onClick={handleCopy}>
                <span className="license-key-label">YOUR LICENSE KEY</span>
                <span className="license-key-value">{licenseKey}</span>
                <button className="copy-btn">
                  {copied ? '\u2713 Copied!' : '\u{1F4CB} Copy'}
                </button>
              </div>

              <div className="success-steps">
                <h3>Next Steps</h3>
                <ol>
                  <li>Download UziTweaks using the button below</li>
                  <li>Run <code>UziTweaks.exe</code> as Administrator</li>
                  <li>Enter your license key when prompted</li>
                  <li>Run the 9-step optimization pipeline</li>
                  <li>Dominate your games</li>
                </ol>
              </div>

              <div className="success-actions">
                <GlowButton size="lg">
                  Download UziTweaks
                </GlowButton>
                <Link to="/">
                  <GlowButton variant="pink" size="sm">Back to Home</GlowButton>
                </Link>
              </div>
            </NeonCard>
          )}
        </div>
      </div>
    </main>
  )
}

export default SuccessPage
