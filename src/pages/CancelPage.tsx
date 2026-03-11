import { Link } from 'react-router-dom'
import GlowButton from '../components/GlowButton'
import NeonCard from '../components/NeonCard'
import './CancelPage.css'

function CancelPage() {
  return (
    <main className="cancel-page">
      <div className="cancel-glow" />
      <div className="container">
        <div className="cancel-content">
          <NeonCard glow="pink" hover={false} className="cancel-card">
            <div className="cancel-icon">X</div>
            <h1>Payment <span className="gradient-text-fire">Cancelled</span></h1>
            <p className="cancel-message">
              Your payment was cancelled and you have not been charged.
              <br />
              If this was a mistake, you can try again below.
            </p>
            <div className="cancel-actions">
              <Link to="/#pricing">
                <GlowButton size="lg">
                  Try Again
                </GlowButton>
              </Link>
              <Link to="/">
                <GlowButton variant="pink" size="sm">
                  Back to Home
                </GlowButton>
              </Link>
            </div>
            <p className="cancel-support">
              Need help? <a href="mailto:support@uzitweaks.com">Contact support</a>
            </p>
          </NeonCard>
        </div>
      </div>
    </main>
  )
}

export default CancelPage
