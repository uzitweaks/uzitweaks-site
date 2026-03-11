import { useState, useEffect, useRef } from 'react'
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

const testimonials = [
  {
    name: 'xReaperGG',
    game: 'Fortnite Competitive',
    rating: 5,
    text: 'Went from 120fps drops to consistent 240fps in stacked endgames. The network optimizer alone cut my ping by 15ms. This is not placebo, the difference is night and day.',
    avatar: 'R',
  },
  {
    name: 'AceValorant',
    game: 'Valorant / Immortal',
    rating: 5,
    text: 'My 1% lows improved massively. No more micro-stutters during gunfights. The FACEIT AC checker saved me hours of troubleshooting. Worth every penny.',
    avatar: 'A',
  },
  {
    name: 'ProdigyCS',
    game: 'CS2 / FACEIT Level 10',
    rating: 5,
    text: 'Timer resolution fix + DPC latency optimization made my mouse feel completely different. Input lag went from 8ms to under 3ms. If you play competitive FPS, you need this.',
    avatar: 'P',
  },
  {
    name: 'TurboApex',
    game: 'Apex Legends / Master',
    rating: 5,
    text: 'The per-game optimizer detected all my Steam and EA games automatically. One click and everything was optimized. Boot time went from 45s to 12s. Insane.',
    avatar: 'T',
  },
]

const comparisonData = [
  { feature: 'Registry Optimizations', uzi: '100+', manual: '10-20 (if you find them)', other: '30-50' },
  { feature: 'Driver Management', uzi: true, manual: false, other: false },
  { feature: 'Auto Restore System', uzi: true, manual: false, other: 'Partial' },
  { feature: 'Network Optimizer + DNS Bench', uzi: true, manual: false, other: false },
  { feature: 'Per-Game Optimization', uzi: true, manual: false, other: false },
  { feature: 'GPU Overclock Profiles', uzi: true, manual: false, other: false },
  { feature: 'FACEIT AC Diagnostics', uzi: true, manual: false, other: false },
  { feature: 'Game Config Profiles', uzi: '6+ Games', manual: 'DIY', other: '2-3 Games' },
  { feature: 'Dual Benchmark System', uzi: true, manual: false, other: false },
  { feature: 'FPS Overlay', uzi: true, manual: false, other: 'Paid Add-on' },
  { feature: 'Process Priority Manager', uzi: 'Automatic', manual: 'Manual', other: false },
  { feature: 'Time to Optimize', uzi: '< 5 min', manual: '3-5 hours', other: '15-30 min' },
  { feature: 'Risk of Breaking System', uzi: 'None (auto-restore)', manual: 'High', other: 'Medium' },
  { feature: 'Price', uzi: 'One-time $29.99', manual: 'Free (your time)', other: '$15-80/yr subscription' },
]

const beforeAfterStats = [
  { label: 'Average FPS', before: 142, after: 237, suffix: ' FPS', icon: '\u{1F3AE}' },
  { label: '1% Low FPS', before: 68, after: 165, suffix: ' FPS', icon: '\u{1F4C8}' },
  { label: 'Input Latency', before: 12, after: 3, suffix: 'ms', icon: '\u{1F5B1}' },
  { label: 'Boot Time', before: 48, after: 11, suffix: 's', icon: '\u{26A1}' },
  { label: 'Network Ping', before: 42, after: 18, suffix: 'ms', icon: '\u{1F310}' },
  { label: 'DPC Latency', before: 850, after: 95, suffix: '\u00B5s', icon: '\u{1F50C}' },
]

/* ============================================
   Animated Counter Hook
   ============================================ */
function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, trigger])
  return count
}

/* ============================================
   Intersection Observer Hook
   ============================================ */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ============================================
   Particle component for hero
   ============================================ */
function HeroParticles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.5 + 0.1,
  }))

  return (
    <div className="hero-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}

/* ============================================
   Star Rating
   ============================================ */
function StarRating({ count }: { count: number }) {
  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star ${i < count ? 'filled' : ''}`}>
          {'\u2605'}
        </span>
      ))}
    </div>
  )
}

/* ============================================
   HomePage Component
   ============================================ */
function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [buying, setBuying] = useState(false)

  // Scroll reveal refs
  const trustRef = useInView(0.3)
  const featuresRef = useInView(0.1)
  const extrasRef = useInView(0.1)
  const beforeAfterRef = useInView(0.3)
  const videoRef = useInView(0.3)
  const comparisonRef = useInView(0.1)
  const testimonialsRef = useInView(0.1)
  const howRef = useInView(0.1)
  const pricingRef = useInView(0.2)
  const faqRef = useInView(0.1)
  const ctaRef = useInView(0.3)

  // Animated gamer counter
  const gamerCount = useCountUp(12847, 2000, trustRef.inView)

  const handleBuyNow = async () => {
    setBuying(true)
    try {
      const res = await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`)
      }
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Something went wrong. Please try again or contact support@uzitweaks.com')
      setBuying(false)
    }
  }

  return (
    <main className="home">
      {/* ========== HERO ========== */}
      <section className="hero" id="hero">
        <div className="hero-bg-grid" />
        <HeroParticles />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-glow hero-glow-3" />
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
              Get UziTweaks {'\u2192'}
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

      {/* ========== TRUSTED BY / SOCIAL PROOF ========== */}
      <section className="trust-section" id="trust" ref={trustRef.ref}>
        <div className={`container fade-in-section ${trustRef.inView ? 'visible' : ''}`}>
          <div className="trust-counter">
            <div className="trust-counter-number">{gamerCount.toLocaleString()}+</div>
            <div className="trust-counter-label">Gamers Trust UziTweaks</div>
          </div>
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="trust-badge-icon">{'\u{1F6E1}'}</div>
              <span>Anti-Cheat Safe</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">{'\u{1F512}'}</div>
              <span>Secure Checkout</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">{'\u{267B}'}</div>
              <span>Fully Reversible</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">{'\u{1F3C6}'}</div>
              <span>Lifetime License</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">{'\u{26A1}'}</div>
              <span>.NET 9 Powered</span>
            </div>
          </div>
          <div className="featured-in">
            <span className="featured-label">COMPATIBLE WITH</span>
            <div className="featured-logos">
              <span className="featured-logo-text">FACEIT</span>
              <span className="featured-logo-text">Vanguard</span>
              <span className="featured-logo-text">EasyAntiCheat</span>
              <span className="featured-logo-text">Steam</span>
              <span className="featured-logo-text">Epic Games</span>
              <span className="featured-logo-text">Battle.net</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="features" id="features" ref={featuresRef.ref}>
        <div className={`container fade-in-section ${featuresRef.inView ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="gradient-text">9-Step</span> Optimization Pipeline
          </h2>
          <p className="section-subtitle">
            A complete workflow that takes your system from stock to fully optimized.
            Every step is automated, reversible, and battle-tested.
          </p>
          <div className="features-grid">
            {features.map((f, i) => (
              <NeonCard key={f.step} glow={f.color}>
                <div className={`feature-card-inner fade-in-card ${featuresRef.inView ? 'visible' : ''}`} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="feature-step">{f.step}</div>
                  <div className="feature-icon">{f.icon}</div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </NeonCard>
            ))}
          </div>
        </div>
      </section>

      {/* ========== EXTRAS ========== */}
      <section className="extras" id="extras" ref={extrasRef.ref}>
        <div className={`container fade-in-section ${extrasRef.inView ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="gradient-text-fire">Packed With</span> Power Tools
          </h2>
          <p className="section-subtitle">
            Beyond the 9-step pipeline, UziTweaks includes a full suite of real-time performance tools.
          </p>
          <div className="extras-grid">
            <div className="extra-item">
              <div className="extra-icon-wrap pink">{'\u{1F3AF}'}</div>
              <h4>Dual Benchmark</h4>
              <p>Optimization Score (0-100) scans your Windows state. Hardware Score benchmarks raw CPU, disk, RAM, and network performance.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap cyan">{'\u{1F4CA}'}</div>
              <h4>FPS Overlay</h4>
              <p>Real-time FPS counter overlay that works with any game. Lightweight, always-on-top, no performance impact.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap green">{'\u{1F3AE}'}</div>
              <h4>Game Optimizer</h4>
              <p>Detects all installed games across Steam, Epic, EA, Ubisoft, and Battle.net. Applies per-exe Windows optimizations automatically.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap purple">{'\u{1F4BE}'}</div>
              <h4>Auto Process Lasso</h4>
              <p>Detects game launches in real-time and automatically sets CPU priority, affinity, and I/O priority for maximum performance.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap orange">{'\u{1F525}'}</div>
              <h4>GPU Overclock</h4>
              <p>NVIDIA GPU overclock profiles built in. Apply tested overclock presets or create custom profiles with one click.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap pink">{'\u{1F6E1}'}</div>
              <h4>FACEIT AC Ready</h4>
              <p>Built-in FACEIT Anti-Cheat diagnostics. Checks Secure Boot, TPM, VBS, unsigned drivers, and fixes common issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BEFORE vs AFTER ========== */}
      <section className="before-after" id="results" ref={beforeAfterRef.ref}>
        <div className={`container fade-in-section ${beforeAfterRef.inView ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="gradient-text-fire">Before</span> vs <span className="gradient-text">After</span>
          </h2>
          <p className="section-subtitle">
            Real performance gains measured on mid-range hardware. Results vary by system, but the improvement is always significant.
          </p>
          <div className="ba-grid">
            {beforeAfterStats.map((stat, i) => {
              const isReduction = stat.after < stat.before
              const improvement = isReduction
                ? Math.round(((stat.before - stat.after) / stat.before) * 100)
                : Math.round(((stat.after - stat.before) / stat.before) * 100)
              return (
                <div
                  key={stat.label}
                  className={`ba-card fade-in-card ${beforeAfterRef.inView ? 'visible' : ''}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="ba-icon">{stat.icon}</div>
                  <div className="ba-label">{stat.label}</div>
                  <div className="ba-values">
                    <div className="ba-before">
                      <span className="ba-val-label">BEFORE</span>
                      <span className="ba-val-num before-num">{stat.before}{stat.suffix}</span>
                    </div>
                    <div className="ba-arrow">{'\u2192'}</div>
                    <div className="ba-after">
                      <span className="ba-val-label">AFTER</span>
                      <span className="ba-val-num after-num">{stat.after}{stat.suffix}</span>
                    </div>
                  </div>
                  <div className={`ba-improvement ${isReduction ? 'reduction' : 'increase'}`}>
                    {isReduction ? `\u2193 ${improvement}% lower` : `\u2191 ${improvement}% higher`}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="ba-disclaimer">
            * Tested on Intel i5-12400F / RTX 4060 Ti / 16GB DDR4 / NVMe SSD. Individual results may vary.
          </p>
        </div>
      </section>

      {/* ========== VIDEO / MEDIA SECTION ========== */}
      <section className="video-section" id="demo" ref={videoRef.ref}>
        <div className={`container fade-in-section ${videoRef.inView ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="gradient-text">See It</span> In Action
          </h2>
          <p className="section-subtitle">
            Watch how UziTweaks transforms a stock Windows system in under 5 minutes.
          </p>
          <div className="video-wrapper">
            <div className="video-placeholder">
              <div className="video-play-btn">
                <div className="play-icon">{'\u25B6'}</div>
              </div>
              <div className="video-overlay-text">
                <span className="video-badge">DEMO VIDEO</span>
                <h3>Full Optimization Walkthrough</h3>
                <p>Coming Soon - Subscribe for updates</p>
              </div>
              <div className="video-glow-border" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== COMPARISON TABLE ========== */}
      <section className="comparison" id="comparison" ref={comparisonRef.ref}>
        <div className={`container fade-in-section ${comparisonRef.inView ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="gradient-text">UziTweaks</span> vs The Rest
          </h2>
          <p className="section-subtitle">
            Stop wasting hours on YouTube guides. Stop paying subscriptions for half-baked tools.
          </p>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="comp-feature-col">Feature</th>
                  <th className="comp-uzi-col">
                    <div className="comp-header-badge">BEST VALUE</div>
                    UziTweaks
                  </th>
                  <th className="comp-other-col">YouTube / Manual</th>
                  <th className="comp-other-col">Other Optimizers</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i}>
                    <td className="comp-feature-name">{row.feature}</td>
                    <td className="comp-uzi-val">
                      {row.uzi === true ? <span className="comp-check">{'\u2713'}</span> :
                       row.uzi === false ? <span className="comp-x">{'\u2715'}</span> :
                       <span className="comp-text-val">{row.uzi}</span>}
                    </td>
                    <td className="comp-other-val">
                      {row.manual === true ? <span className="comp-check dim">{'\u2713'}</span> :
                       row.manual === false ? <span className="comp-x">{'\u2715'}</span> :
                       <span className="comp-text-val dim">{row.manual}</span>}
                    </td>
                    <td className="comp-other-val">
                      {row.other === true ? <span className="comp-check dim">{'\u2713'}</span> :
                       row.other === false ? <span className="comp-x">{'\u2715'}</span> :
                       <span className="comp-text-val dim">{row.other}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="testimonials" id="testimonials" ref={testimonialsRef.ref}>
        <div className={`container fade-in-section ${testimonialsRef.inView ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="gradient-text">What Gamers</span> Are Saying
          </h2>
          <p className="section-subtitle">
            Real reviews from competitive players who switched to UziTweaks.
          </p>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card fade-in-card ${testimonialsRef.inView ? 'visible' : ''}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <div className="testimonial-info">
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-game">{t.game}</div>
                  </div>
                </div>
                <StarRating count={t.rating} />
                <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="how-it-works" id="how-it-works" ref={howRef.ref}>
        <div className={`container fade-in-section ${howRef.inView ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="gradient-text">How It</span> Works
          </h2>
          <p className="section-subtitle">
            Three steps to peak performance. No technical knowledge required.
          </p>
          <div className="steps-row">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon-wrap">{'\u{1F4B3}'}</div>
              <h3>Buy</h3>
              <p>Purchase your lifetime license. Instant delivery via email and on-screen.</p>
            </div>
            <div className="step-connector">
              <div className="connector-line" />
              <div className="connector-arrow">{'\u25B6'}</div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon-wrap">{'\u2B07\uFE0F'}</div>
              <h3>Download</h3>
              <p>Download UziTweaks, enter your license key, and unlock all features instantly.</p>
            </div>
            <div className="step-connector">
              <div className="connector-line" />
              <div className="connector-arrow">{'\u25B6'}</div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon-wrap">{'\u{1F451}'}</div>
              <h3>Dominate</h3>
              <p>Run the 9-step pipeline. Your system is now fully optimized. Go win.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section className="pricing" id="pricing" ref={pricingRef.ref}>
        <div className={`container fade-in-section ${pricingRef.inView ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="gradient-text">Get</span> UziTweaks
          </h2>
          <p className="section-subtitle">
            One purchase. Lifetime access. No subscriptions. No hidden fees.
          </p>
          <div className="pricing-card-wrap">
            <NeonCard glow="cyan" hover={false} className="pricing-card">
              <div className="pricing-popular-badge">MOST POPULAR</div>
              <div className="pricing-badge">LIFETIME LICENSE</div>
              <div className="pricing-original-price">
                <span className="strikethrough">$79.99</span>
              </div>
              <div className="pricing-price">
                <span className="pricing-currency">$</span>
                <span className="pricing-amount">29.99</span>
              </div>
              <div className="pricing-save-badge">LAUNCH DISCOUNT - SAVE 50%+</div>
              <p className="pricing-note">One-time payment {'\u00B7'} No subscription {'\u00B7'} Lifetime updates</p>
              <ul className="pricing-features">
                <li><span className="check">{'\u2713'}</span> All 9 optimization steps</li>
                <li><span className="check">{'\u2713'}</span> 100+ registry & system tweaks</li>
                <li><span className="check">{'\u2713'}</span> Driver auto-detection & install</li>
                <li><span className="check">{'\u2713'}</span> Network optimizer with DNS benchmark</li>
                <li><span className="check">{'\u2713'}</span> Game configs (Fortnite, Valorant, CS2, etc.)</li>
                <li><span className="check">{'\u2713'}</span> Per-game optimizer (Steam, Epic, EA, Ubisoft)</li>
                <li><span className="check">{'\u2713'}</span> FPS overlay & dual benchmark</li>
                <li><span className="check">{'\u2713'}</span> GPU overclock profiles</li>
                <li><span className="check">{'\u2713'}</span> Auto Process Lasso</li>
                <li><span className="check">{'\u2713'}</span> FACEIT AC diagnostics</li>
                <li><span className="check">{'\u2713'}</span> Full restore / undo system</li>
                <li><span className="check">{'\u2713'}</span> Lifetime updates</li>
              </ul>
              <GlowButton size="lg" onClick={handleBuyNow} disabled={buying} className="pricing-cta">
                {buying ? 'Redirecting to Stripe...' : 'Buy Now \u2192'}
              </GlowButton>
              <p className="pricing-secure">{'\u{1F512}'} Secure checkout via Stripe {'\u00B7'} Instant delivery</p>
              <div className="pricing-guarantee">
                <div className="guarantee-icon">{'\u{1F6E1}'}</div>
                <span>30-day money-back guarantee. No questions asked.</span>
              </div>
            </NeonCard>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="faq" id="faq" ref={faqRef.ref}>
        <div className={`container fade-in-section ${faqRef.inView ? 'visible' : ''}`}>
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
      <section className="final-cta" ref={ctaRef.ref}>
        <div className={`container fade-in-section ${ctaRef.inView ? 'visible' : ''}`}>
          <div className="final-cta-inner">
            <h2 className="section-title">
              Ready to <span className="gradient-text">Dominate</span>?
            </h2>
            <p className="final-cta-text">
              Stop losing frames. Stop suffering input lag. Get UziTweaks and unlock
              your system's true performance.
            </p>
            <GlowButton size="lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Get UziTweaks Now {'\u2192'}
            </GlowButton>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
