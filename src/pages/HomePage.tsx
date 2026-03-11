import { useState } from 'react'
import GlowButton from '../components/GlowButton'
import NeonCard from '../components/NeonCard'
import { API_URL } from '../config'
import './HomePage.css'

/* ============================================
   Feature Data
   ============================================ */
const features = [
  {
    step: '01',
    title: 'Drivers',
    icon: '\u2699\uFE0F',
    color: 'cyan' as const,
    desc: 'Auto-detect and install the latest GPU, Network, Audio & Chipset drivers with multi-fallback install system.',
  },
  {
    step: '02',
    title: 'Optimize',
    icon: '\u26A1',
    color: 'purple' as const,
    desc: '100+ registry tweaks, power plan optimization, timer resolution, GPU scheduling, MMCSS priority, and more.',
  },
  {
    step: '03',
    title: 'Debloat',
    icon: '\uD83D\uDDD1\uFE0F',
    color: 'pink' as const,
    desc: 'Remove 60+ bloatware services, disable telemetry, strip UWP apps, kill background processes.',
  },
  {
    step: '04',
    title: 'Net Boost',
    icon: '\uD83C\uDF10',
    color: 'green' as const,
    desc: 'DNS benchmark, Nagle algorithm disable, network throttling removal, QoS optimization for minimal ping.',
  },
  {
    step: '05',
    title: 'Startup',
    icon: '\uD83D\uDE80',
    color: 'orange' as const,
    desc: 'Manage startup programs, disable unnecessary boot services, slash boot time dramatically.',
  },
  {
    step: '06',
    title: 'Cleaner',
    icon: '\uD83E\uDDF9',
    color: 'cyan' as const,
    desc: 'Deep disk cleanup \u2014 temp files, caches, Windows Update leftovers, browser data. Reclaim gigabytes.',
  },
  {
    step: '07',
    title: 'Tools',
    icon: '\uD83D\uDEE0\uFE0F',
    color: 'purple' as const,
    desc: 'FPS overlay, GPU overclock profiles, RAM cleaner, DPC latency tester, input lag analyzer, monitor optimizer.',
  },
  {
    step: '08',
    title: 'Game Config',
    icon: '\uD83C\uDFAE',
    color: 'pink' as const,
    desc: 'One-click pro configs for Fortnite, Valorant, CS2, Apex Legends, Rocket League, Rainbow Six Siege.',
  },
  {
    step: '09',
    title: 'Profiles',
    icon: '\uD83D\uDC51',
    color: 'green' as const,
    desc: 'Per-game optimization profiles with QoS, auto process priority, Defender exclusions, and FSO disable.',
  },
]

const faqs = [
  {
    q: 'Is UziTweaks safe to use?',
    a: 'Absolutely. UziTweaks creates a full restore script before making any changes. Every tweak can be reversed with one click. No permanent modifications are made without your consent.',
  },
  {
    q: 'Will this get me banned in competitive games?',
    a: 'No. UziTweaks only modifies Windows system settings, registry values, and network configurations. It does not inject into or modify any game files. It is fully compatible with anti-cheat software including FACEIT AC, Vanguard, and EAC.',
  },
  {
    q: 'What games does it support?',
    a: 'UziTweaks optimizes your entire Windows system, so every game benefits. It also has dedicated config profiles for Fortnite, Valorant, CS2, Apex Legends, Rocket League, and Rainbow Six Siege, with more being added regularly.',
  },
  {
    q: 'How does the license work?',
    a: 'You get a lifetime license key tied to your purchase. Enter it in the app to unlock all features. One license per machine. No subscriptions, no recurring charges.',
  },
  {
    q: 'What Windows versions are supported?',
    a: 'UziTweaks is built for Windows 10 (21H2+) and Windows 11. It requires a 64-bit system with .NET 9 runtime (bundled with the app).',
  },
  {
    q: 'Can I undo the changes?',
    a: 'Yes. UziTweaks automatically generates restore scripts (both .bat and .ps1) on your Desktop before applying any tweaks. There is also a dedicated Restore page inside the app to revert everything.',
  },
]

/* ============================================
   HomePage Component
   ============================================ */
function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [buying, setBuying] = useState(false)

  const handleBuyNow = async () => {
    setBuying(true)
    try {
      const res = await fetch(`${API_URL}/api/checkout`, { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      alert('Something went wrong. Please try again.')
      setBuying(false)
    }
  }

  return (
    <main className="home">
      {/* ========== HERO ========== */}
      <section className="hero" id="hero">
        <div className="hero-bg-grid" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            PREMIUM GAMING SOFTWARE
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line">UZI</span>
            <span className="hero-title-line hero-title-accent">TWEAKS</span>
          </h1>
          <p className="hero-subtitle">
            The ultimate Windows gaming optimizer. 100+ tweaks, driver management,
            network optimization, game configs, and real-time performance tools.
            <br />
            <strong>One app. Maximum FPS. Zero input lag.</strong>
          </p>
          <div className="hero-cta-row">
            <GlowButton size="lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Get UziTweaks
            </GlowButton>
            <GlowButton
              variant="pink"
              size="lg"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Features
            </GlowButton>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">100+</span>
              <span className="hero-stat-label">System Tweaks</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">9</span>
              <span className="hero-stat-label">Optimizer Steps</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">6+</span>
              <span className="hero-stat-label">Game Configs</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">
            <span className="gradient-text">9-Step</span> Optimization Pipeline
          </h2>
          <p className="section-subtitle">
            A complete workflow that takes your system from stock to fully optimized.
            Every step is automated, reversible, and battle-tested.
          </p>
          <div className="features-grid">
            {features.map((f) => (
              <NeonCard key={f.step} glow={f.color}>
                <div className="feature-step">{f.step}</div>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      {/* ========== EXTRAS ========== */}
      <section className="extras" id="extras">
        <div className="container">
          <h2 className="section-title">
            <span className="gradient-text-fire">Packed With</span> Power Tools
          </h2>
          <p className="section-subtitle">
            Beyond the 9-step pipeline, UziTweaks includes a full suite of real-time performance tools.
          </p>
          <div className="extras-grid">
            <div className="extra-item">
              <div className="extra-icon-wrap pink">{'🎯'}</div>
              <h4>Dual Benchmark</h4>
              <p>Optimization Score (0-100) scans your Windows state. Hardware Score benchmarks raw CPU, disk, RAM, and network performance.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap cyan">{'📊'}</div>
              <h4>FPS Overlay</h4>
              <p>Real-time FPS counter overlay that works with any game. Lightweight, always-on-top, no performance impact.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap green">{'🎮'}</div>
              <h4>Game Optimizer</h4>
              <p>Detects all installed games across Steam, Epic, EA, Ubisoft, and Battle.net. Applies per-exe Windows optimizations automatically.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap purple">{'💾'}</div>
              <h4>Auto Process Lasso</h4>
              <p>Detects game launches in real-time and automatically sets CPU priority, affinity, and I/O priority for maximum performance.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap orange">{'🔥'}</div>
              <h4>GPU Overclock</h4>
              <p>NVIDIA GPU overclock profiles built in. Apply tested overclock presets or create custom profiles with one click.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap pink">{'🛡️'}</div>
              <h4>FACEIT AC Ready</h4>
              <p>Built-in FACEIT Anti-Cheat diagnostics. Checks Secure Boot, TPM, VBS, unsigned drivers, and fixes common issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <h2 className="section-title">
            <span className="gradient-text">How It</span> Works
          </h2>
          <p className="section-subtitle">
            Three steps to peak performance. No technical knowledge required.
          </p>
          <div className="steps-row">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon-wrap">{'💳'}</div>
              <h3>Buy</h3>
              <p>Purchase your lifetime license. Instant delivery via email and on-screen.</p>
            </div>
            <div className="step-connector">
              <div className="connector-line" />
              <div className="connector-arrow">{'▶'}</div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon-wrap">{'⬇️'}</div>
              <h3>Download</h3>
              <p>Download UziTweaks, enter your license key, and unlock all features instantly.</p>
            </div>
            <div className="step-connector">
              <div className="connector-line" />
              <div className="connector-arrow">{'▶'}</div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon-wrap">{'👑'}</div>
              <h3>Dominate</h3>
              <p>Run the 9-step pipeline. Your system is now fully optimized. Go win.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section className="pricing" id="pricing">
        <div className="container">
          <h2 className="section-title">
            <span className="gradient-text">Get</span> UziTweaks
          </h2>
          <p className="section-subtitle">
            One purchase. Lifetime access. No subscriptions. No hidden fees.
          </p>
          <div className="pricing-card-wrap">
            <NeonCard glow="cyan" hover={false} className="pricing-card">
              <div className="pricing-badge">LIFETIME LICENSE</div>
              <div className="pricing-price">
                <span className="pricing-currency">$</span>
                <span className="pricing-amount">XX</span>
              </div>
              <p className="pricing-note">One-time payment</p>
              <ul className="pricing-features">
                <li><span className="check">\u2713</span> All 9 optimization steps</li>
                <li><span className="check">\u2713</span> 100+ registry & system tweaks</li>
                <li><span className="check">\u2713</span> Driver auto-detection & install</li>
                <li><span className="check">\u2713</span> Network optimizer with DNS benchmark</li>
                <li><span className="check">\u2713</span> Game configs (Fortnite, Valorant, CS2, etc.)</li>
                <li><span className="check">\u2713</span> Per-game optimizer (Steam, Epic, EA, Ubisoft)</li>
                <li><span className="check">\u2713</span> FPS overlay & dual benchmark</li>
                <li><span className="check">\u2713</span> GPU overclock profiles</li>
                <li><span className="check">\u2713</span> Auto Process Lasso</li>
                <li><span className="check">\u2713</span> FACEIT AC diagnostics</li>
                <li><span className="check">\u2713</span> Full restore / undo system</li>
                <li><span className="check">\u2713</span> Lifetime updates</li>
              </ul>
              <GlowButton size="lg" onClick={handleBuyNow} disabled={buying} className="pricing-cta">
                {buying ? 'Redirecting...' : 'Buy Now'}
              </GlowButton>
              <p className="pricing-secure">{'🔒'} Secure checkout via Stripe</p>
            </NeonCard>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="faq" id="faq">
        <div className="container">
          <h2 className="section-title">
            <span className="gradient-text">Frequently Asked</span> Questions
          </h2>
          <p className="section-subtitle">
            Everything you need to know before getting started.
          </p>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <span className="faq-toggle">{openFaq === i ? '\u2212' : '+'}</span>
                </div>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="final-cta">
        <div className="container">
          <div className="final-cta-inner">
            <h2 className="section-title">
              Ready to <span className="gradient-text">Dominate</span>?
            </h2>
            <p className="final-cta-text">
              Stop losing frames. Stop suffering input lag. Get UziTweaks and unlock
              your system's true performance.
            </p>
            <GlowButton size="lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Get UziTweaks Now
            </GlowButton>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
