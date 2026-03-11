import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import GlowButton from '../components/GlowButton'
import NeonCard from '../components/NeonCard'
import { API_URL } from '../config'
import './SuccessPage.css'

function SuccessPage() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('order_id')

  const [licenseKey, setLicenseKey] = useState<string | null>(null)
  const [orderStatus, setOrderStatus] = useState<string>('loading')
  const [copied, setCopied] = useState(false)
  const [retries, setRetries] = useState(0)

  useEffect(() => {
    if (!orderId) {
      setOrderStatus('no_order')
      return
    }

    let cancelled = false
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_URL}/api/order?order_id=${orderId}`)
        if (!res.ok) throw new Error('Order not found')
        const data = await res.json()

        if (cancelled) return

        if (data.status === 'fulfilled' && data.license_key) {
          setLicenseKey(data.license_key)
          setOrderStatus('fulfilled')
        } else if (data.status === 'pending' || data.status === 'confirming' || data.status === 'waiting') {
          setOrderStatus('waiting')
          // Poll every 10 seconds for up to 5 minutes
          if (retries < 30) {
            setTimeout(() => setRetries((r) => r + 1), 10000)
          } else {
            setOrderStatus('timeout')
          }
        } else if (data.status === 'unfulfilled') {
          setOrderStatus('unfulfilled')
        } else {
          setOrderStatus('waiting')
          if (retries < 30) {
            setTimeout(() => setRetries((r) => r + 1), 10000)
          }
        }
      } catch {
        if (!cancelled) setOrderStatus('error')
      }
    }

    fetchOrder()
    return () => { cancelled = true }
  }, [orderId, retries])

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
          {orderStatus === 'loading' || orderStatus === 'waiting' ? (
            <NeonCard glow="cyan" hover={false} className="success-card">
              <div className="success-loading">
                <div className="spinner" />
                <h1>Processing <span className="gradient-text">Payment</span></h1>
                <p className="success-message">
                  Waiting for crypto confirmation. This can take a few minutes depending on the network.
                </p>
                <p className="success-hint">This page auto-refreshes. Do not close it.</p>
                {orderId && <p className="session-id">Order: <code>{orderId}</code></p>}
              </div>
            </NeonCard>
          ) : orderStatus === 'fulfilled' ? (
            <NeonCard glow="green" hover={false} className="success-card">
              <div className="success-icon">//</div>
              <h1>Payment <span className="gradient-text">Confirmed</span></h1>
              <p className="success-message">
                Your lifetime license key is ready. Copy it and paste into UziTweaks.
              </p>

              <div className="license-key-box" onClick={handleCopy}>
                <span className="license-key-label">YOUR LICENSE KEY</span>
                <span className="license-key-value">{licenseKey}</span>
                <button className="copy-btn">
                  {copied ? '[ COPIED ]' : '[ COPY ]'}
                </button>
              </div>

              <div className="success-steps">
                <h3>Next Steps</h3>
                <ol>
                  <li>Download UziTweaks using the button below</li>
                  <li>Run <code>UziTweaks.exe</code> as Administrator</li>
                  <li>Enter your license key when prompted</li>
                  <li>Run the 9-step optimization pipeline</li>
                </ol>
              </div>

              <div className="success-actions">
                <a href={`${API_URL}/api/download`}>
                  <GlowButton size="lg">Download UziTweaks</GlowButton>
                </a>
                <Link to="/">
                  <GlowButton variant="pink" size="sm">Back to Home</GlowButton>
                </Link>
              </div>
            </NeonCard>
          ) : (
            <NeonCard glow="pink" hover={false} className="success-card">
              <div className="success-icon error-icon">//</div>
              <h1>{orderStatus === 'no_order' ? 'No Order Found' : 'Order Issue'}</h1>
              <p className="success-message">
                {orderStatus === 'no_order'
                  ? 'No order ID found. If you completed a payment, check your email or contact support.'
                  : orderStatus === 'timeout'
                    ? 'Payment is taking longer than expected. Your key will be assigned once the transaction confirms on-chain.'
                    : orderStatus === 'unfulfilled'
                      ? 'Payment received but no keys available right now. Contact support and we\'ll get you sorted.'
                      : 'Could not retrieve your order. Please contact support with your order ID.'}
              </p>
              {orderId && <p className="session-id">Order: <code>{orderId}</code></p>}
              <div className="success-actions">
                <Link to="/">
                  <GlowButton variant="cyan" size="sm">Back to Home</GlowButton>
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
