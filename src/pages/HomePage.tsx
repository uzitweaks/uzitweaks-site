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
    icon: '//GR',
    color: 'cyan' as const,
    desc: 'Auto-detect GPU/NIC/Audio chipsets and deploy latest signed drivers via multi-fallback pipeline (winget -> direct download -> Windows Update COM API).',
  },
  {
    step: '02',
    title: 'Optimize',
    icon: '>>',
    color: 'purple' as const,
    desc: '150+ kernel-level tweaks: MMCSS thread scheduling, DPC/ISR latency reduction, CPU idle state control, timer resolution override, GPU preemption disable, Win32PrioritySeparation tuning.',
  },
  {
    step: '03',
    title: 'Debloat',
    icon: 'X_X',
    color: 'pink' as const,
    desc: 'Nuclear service killer: 50+ background services disabled, telemetry pipelines severed, UWP bloat stripped, DiagTrack/dmwappush/SysMain terminated.',
  },
  {
    step: '04',
    title: 'Net Boost',
    icon: '<~>',
    color: 'green' as const,
    desc: 'Nagle algorithm disable, TCP/UDP stack tuning, AFD buffer optimization, RSS/interrupt moderation control, NetworkThrottlingIndex bypass, DNS latency benchmark.',
  },
  {
    step: '05',
    title: 'Startup',
    icon: '>>>',
    color: 'orange' as const,
    desc: 'Boot pipeline optimizer: disable non-critical scheduled tasks, strip startup entries, configure BCD for TSC sync + dynamic tick disable + minimal boot overhead.',
  },
  {
    step: '06',
    title: 'Cleaner',
    icon: 'CLR',
    color: 'cyan' as const,
    desc: 'Deep filesystem sweep: shader caches, NTFS metadata, WinSxS, Windows Update residuals, browser data, temp allocations. Reclaim gigabytes of dead storage.',
  },
  {
    step: '07',
    title: 'Tools',
    icon: '[ ]',
    color: 'purple' as const,
    desc: 'FPS overlay, GPU overclock profiles, standby RAM purge, DPC latency analyzer, input lag tester, monitor response optimizer, HPET/TSC diagnostics.',
  },
  {
    step: '08',
    title: 'Game Config',
    icon: 'CFG',
    color: 'pink' as const,
    desc: 'Pre-built competitive configs: CS2 autoexec + launch options, Fortnite engine.ini, Valorant GameUserSettings, Apex videoconfig, R6 GameSettings.ini.',
  },
  {
    step: '09',
    title: 'Profiles',
    icon: '///',
    color: 'green' as const,
    desc: 'Per-exe optimization engine: FSO disable via registry, GPU preference override, IFEO CPU priority injection, Defender exclusion paths, process affinity masks.',
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

const whyUziTweaks = [
  {
    title: 'Kernel-Level Engineering',
    text: 'MSI mode for PCI interrupt routing, CPU affinity masks pinned to physical cores, MMCSS thread quantum tuning, NtSetTimerResolution override to 0.5ms, Spectre/Meltdown mitigation bypass, DPC watchdog disable -- tweaks that require systems programming knowledge to even find.',
    icon: '>>>',
  },
  {
    title: 'Atomic Restore System',
    text: 'Every registry mutation, service state change, and BCD modification is logged. Full restore scripts (.bat + .ps1) generated pre-execution. Deterministic rollback -- not "undo" but exact state restoration.',
    icon: '<->',
  },
  {
    title: 'Per-Process Optimization Engine',
    text: 'Auto-enumerates game executables across Steam, Epic, EA, Ubisoft, Battle.net libraries. Injects IFEO priority class, GPU preference registry overrides, Defender real-time exclusion paths, and FSO behavior flags per-binary.',
    icon: 'OPT',
  },
  {
    title: 'Low-Latency Pipeline',
    text: 'NVIDIA D3PCLatency pre-render queue reduction, USB HID polling optimization, raw mouse input 1:1 curve enforcement, HPET disable + TSC sync, interrupt affinity isolation -- sub-millisecond input latency engineering.',
    icon: '///',
  },
]

const comparisonData = [
  { feature: 'Kernel-Level Registry Tweaks', uzi: '150+', manual: '10-20 (if you find them)', other: '30-50' },
  { feature: 'DPC/ISR Latency Optimization', uzi: true, manual: false, other: false },
  { feature: 'CPU Idle State + C-State Control', uzi: true, manual: false, other: false },
  { feature: 'NVIDIA D3PCLatency + Deep Registry', uzi: true, manual: false, other: false },
  { feature: 'Timer Resolution Override', uzi: '0.5ms', manual: 'Requires ISLC', other: false },
  { feature: 'Interrupt Affinity Isolation', uzi: true, manual: false, other: false },
  { feature: 'Raw Mouse Input Enforcement', uzi: true, manual: 'Partial', other: false },
  { feature: 'Per-Exe IFEO + GPU Preference', uzi: 'Automatic', manual: false, other: false },
  { feature: 'Network Stack Tuning (AFD/Winsock)', uzi: true, manual: false, other: 'Basic' },
  { feature: 'USB HID Polling Optimization', uzi: true, manual: false, other: false },
  { feature: 'Atomic Restore System', uzi: true, manual: false, other: 'Partial' },
  { feature: 'FACEIT AC 8-Point Diagnostics', uzi: true, manual: false, other: false },
  { feature: 'Time to Full Optimization', uzi: '< 5 min', manual: '3-5 hours', other: '15-30 min' },
  { feature: 'Price', uzi: 'One-time $29.99', manual: 'Free (your time)', other: '$15-80/yr' },
]

const beforeAfterStats = [
  { label: 'Average FPS', before: 165, after: 198, suffix: ' FPS', icon: '>>' },
  { label: '1% Low FPS', before: 72, after: 105, suffix: ' FPS', icon: '/\\' },
  { label: 'Input Latency', before: 12, after: 5, suffix: 'ms', icon: '...' },
  { label: 'Boot Time', before: 45, after: 14, suffix: 's', icon: '<<<' },
  { label: 'Background Processes', before: 180, after: 85, suffix: '', icon: 'SYS' },
  { label: 'DPC Latency', before: 650, after: 120, suffix: 'us', icon: 'DPC' },
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
   HomePage Component
   ============================================ */
function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [buying, setBuying] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

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

  // Animated tweak counter
  const tweakCount = useCountUp(150, 1500, trustRef.inView)

  const handleBuyNow = async () => {
    // Validate email
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Enter a valid email to receive your license key.')
      return
    }
    setEmailError('')
    setBuying(true)
    try {
      const res = await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else if (data.error) {
        alert(data.error)
        setBuying(false)
      } else {
        throw new Error('Checkout unavailable')
      }
    } catch {
      alert('Checkout is being set up. Please check back soon or contact us on Discord.')
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
            Kernel-level Windows optimizer. 150+ registry mutations, DPC/ISR latency reduction,
            CPU idle state control, raw mouse input enforcement, GPU preemption disable, timer resolution override.
            <br />
            <strong>One binary. Maximum framerate. Sub-millisecond input latency.</strong>
          </p>
          <div className="hero-cta-row">
            <GlowButton size="lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Get UziTweaks {'->'}
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
              <span className="hero-stat-num">150+</span>
              <span className="hero-stat-label">Kernel Tweaks</span>
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
            <div className="trust-counter-number">{tweakCount}+</div>
            <div className="trust-counter-label">Kernel-Level Optimizations</div>
          </div>
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="trust-badge-icon">{'[X]'}</div>
              <span>Anti-Cheat Safe</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">{'{=}'}</div>
              <span>Secure Checkout</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">{'<->'}</div>
              <span>Fully Reversible</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">{'INF'}</div>
              <span>Lifetime License</span>
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">{'.9.'}</div>
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
              <div className="extra-icon-wrap pink">{'#01'}</div>
              <h4>Dual Benchmark</h4>
              <p>Optimization Score scans 20+ system vectors (power plan, timer res, MMCSS, DPC state). Hardware Score runs raw CPU compute, sequential disk, RAM bandwidth, and ICMP latency benchmarks.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap cyan">{'FPS'}</div>
              <h4>FPS Overlay</h4>
              <p>Lightweight WPF overlay with WS_EX_TRANSPARENT flag. Zero GPU overhead, always-on-top, real-time frame timing with 1% low tracking.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap green">{'OPT'}</div>
              <h4>Game Optimizer</h4>
              <p>Enumerates executables across Steam libraryfolders.vdf, Epic manifests, EA/Ubisoft registries. Applies IFEO priority, GPU preference, FSO disable, Defender exclusions per-binary.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap purple">{'CPU'}</div>
              <h4>Process Priority Engine</h4>
              <p>Background watchdog detects game process launch via WMI event subscription. Auto-sets CpuPriorityClass, IoPagePriority, affinity mask, and memory priority in real-time.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap orange">{'GPU'}</div>
              <h4>GPU Overclock Profiles</h4>
              <p>NVIDIA overclock via nvidia-smi: core clock offset, memory clock offset, power limit override, fan curve control. Tested presets for safe daily use.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap pink">{'AC/'}</div>
              <h4>FACEIT AC Diagnostics</h4>
              <p>8-point diagnostic: Secure Boot, TPM 2.0, VBS/HVCI state, unsigned driver scan, service status, test signing mode, conflicting software detection, Windows build verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== UNDER THE HOOD ========== */}
      <section className="under-hood" id="tech">
        <div className="container">
          <h2 className="section-title">
            <span className="gradient-text-fire">Under</span> The Hood
          </h2>
          <p className="section-subtitle">
            Not a GUI wrapper around regedit. Real systems engineering.
          </p>
          <div className="hood-grid">
            <div className="hood-item">
              <div className="hood-label">KERNEL</div>
              <div className="hood-code">NtSetTimerResolution(5000, TRUE)</div>
              <div className="hood-desc">Override Windows timer to 0.5ms via ntdll.dll direct syscall</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">GPU</div>
              <div className="hood-code">D3PCLatency = 0x1</div>
              <div className="hood-desc">NVIDIA pre-rendered frame queue reduced to single frame</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">CPU</div>
              <div className="hood-code">Win32PrioritySeparation = 0x26</div>
              <div className="hood-desc">Short quantum, variable, foreground boost for game threads</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">IRQ</div>
              <div className="hood-code">AssignmentSetOverride = 0x04</div>
              <div className="hood-desc">GPU interrupts pinned to dedicated core, zero contention</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">NET</div>
              <div className="hood-code">NetworkThrottlingIndex = 0xFFFFFFFF</div>
              <div className="hood-desc">Multimedia network throttling completely bypassed</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">DPC</div>
              <div className="hood-code">DpcWatchdogPeriod = 0x0</div>
              <div className="hood-desc">Kernel DPC watchdog disabled, no forced DPC timeouts</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">MEM</div>
              <div className="hood-code">DisablePagingExecutive = 0x1</div>
              <div className="hood-desc">Kernel and drivers locked in RAM, never paged to disk</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">HID</div>
              <div className="hood-code">MouseSpeed = 0 | Threshold = 0</div>
              <div className="hood-desc">Raw 1:1 mouse input, zero acceleration, linear curve</div>
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
            Typical improvements on a bloated Windows system. Results depend on your current system state and hardware.
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
                    <div className="ba-arrow">{'->'}</div>
                    <div className="ba-after">
                      <span className="ba-val-label">AFTER</span>
                      <span className="ba-val-num after-num">{stat.after}{stat.suffix}</span>
                    </div>
                  </div>
                  <div className={`ba-improvement ${isReduction ? 'reduction' : 'increase'}`}>
                    {isReduction ? `v ${improvement}% lower` : `^ ${improvement}% higher`}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="ba-disclaimer">
            * Measured on a typical mid-range gaming PC with a bloated Windows install. Clean installs will see smaller gains. Results vary by system.
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
                <div className="play-icon">{'>'}</div>
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
                      {row.uzi === true ? <span className="comp-check">{'//'}</span> :
                       row.uzi === false ? <span className="comp-x">{'x'}</span> :
                       <span className="comp-text-val">{row.uzi}</span>}
                    </td>
                    <td className="comp-other-val">
                      {row.manual === true ? <span className="comp-check dim">{'//'}</span> :
                       row.manual === false ? <span className="comp-x">{'x'}</span> :
                       <span className="comp-text-val dim">{row.manual}</span>}
                    </td>
                    <td className="comp-other-val">
                      {row.other === true ? <span className="comp-check dim">{'//'}</span> :
                       row.other === false ? <span className="comp-x">{'x'}</span> :
                       <span className="comp-text-val dim">{row.other}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========== WHY UZITWEAKS ========== */}
      <section className="testimonials" id="why" ref={testimonialsRef.ref}>
        <div className={`container fade-in-section ${testimonialsRef.inView ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="gradient-text">Why</span> UziTweaks
          </h2>
          <p className="section-subtitle">
            What makes this different from a YouTube guide or free optimizer.
          </p>
          <div className="testimonials-grid">
            {whyUziTweaks.map((item, i) => (
              <div
                key={i}
                className={`testimonial-card fade-in-card ${testimonialsRef.inView ? 'visible' : ''}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{item.icon}</div>
                  <div className="testimonial-info">
                    <div className="testimonial-name">{item.title}</div>
                  </div>
                </div>
                <p className="testimonial-text">{item.text}</p>
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
              <div className="step-icon-wrap">{'$$$'}</div>
              <h3>Buy</h3>
              <p>Purchase your lifetime license via crypto. Key delivered to your email and displayed on-screen instantly.</p>
            </div>
            <div className="step-connector">
              <div className="connector-line" />
              <div className="connector-arrow">{'>'}</div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon-wrap">{'DWN'}</div>
              <h3>Download</h3>
              <p>Download UziTweaks, enter your license key, and unlock all features instantly.</p>
            </div>
            <div className="step-connector">
              <div className="connector-line" />
              <div className="connector-arrow">{'>'}</div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon-wrap">{'!!!'}</div>
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
              <p className="pricing-note">One-time payment {' | '} No subscription {' | '} Lifetime updates</p>
              <ul className="pricing-features">
                <li><span className="check">{'//'}</span> 150+ kernel-level system tweaks</li>
                <li><span className="check">{'//'}</span> DPC/ISR latency optimization</li>
                <li><span className="check">{'//'}</span> CPU idle state + C-state control</li>
                <li><span className="check">{'//'}</span> Raw mouse input + USB HID polling</li>
                <li><span className="check">{'//'}</span> NVIDIA deep registry + D3PCLatency</li>
                <li><span className="check">{'//'}</span> Timer resolution override (0.5ms)</li>
                <li><span className="check">{'//'}</span> Per-exe game optimizer engine</li>
                <li><span className="check">{'//'}</span> Network stack tuning (AFD/Winsock/TCP)</li>
                <li><span className="check">{'//'}</span> Interrupt affinity isolation</li>
                <li><span className="check">{'//'}</span> GPU overclock + shader cache control</li>
                <li><span className="check">{'//'}</span> FACEIT AC 8-point diagnostics</li>
                <li><span className="check">{'//'}</span> Atomic restore system + lifetime updates</li>
              </ul>
              <div className="pricing-email-wrap">
                <input
                  type="email"
                  className={`pricing-email-input ${emailError ? 'error' : ''}`}
                  placeholder="Enter your email for license delivery"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && handleBuyNow()}
                />
                {emailError && <span className="pricing-email-error">{emailError}</span>}
              </div>
              <GlowButton size="lg" onClick={handleBuyNow} disabled={buying} className="pricing-cta">
                {buying ? 'Redirecting to checkout...' : 'Buy Now ->'}
              </GlowButton>
              <p className="pricing-secure">{'{=}'} Secure crypto checkout {' | '} Key delivered to your email + on-screen</p>
              <div className="pricing-guarantee">
                <div className="guarantee-icon">{'[X]'}</div>
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
                  <span className="faq-toggle">{openFaq === i ? '-' : '+'}</span>
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
              Stop bleeding frames to bloated services. Stop losing gunfights to DPC latency spikes.
              Bypass the throttling. Override the defaults. Unlock kernel-level performance.
            </p>
            <GlowButton size="lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
              Get UziTweaks Now {'->'}
            </GlowButton>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
