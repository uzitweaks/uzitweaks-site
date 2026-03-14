import { useState, useEffect, useRef } from 'react'
import GlowButton from '../components/GlowButton'
import NeonCard from '../components/NeonCard'
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
    desc: 'Auto-detect and install the latest GPU, Network, Audio & Chipset drivers. Multiple fallback methods if one fails.',
  },
  {
    step: '02',
    title: 'Optimize',
    icon: '>>',
    color: 'purple' as const,
    desc: 'Deep system optimization across thread scheduling, DPC latency, timer resolution, GPU priority, power states, and memory management. Over 1500 individual tweaks.',
  },
  {
    step: '03',
    title: 'Debloat',
    icon: 'X_X',
    color: 'pink' as const,
    desc: 'Disable 50+ unnecessary services, kill telemetry, remove bloatware apps, stop background data collection. Free up CPU and RAM for your games.',
  },
  {
    step: '04',
    title: 'Net Boost',
    icon: '<~>',
    color: 'green' as const,
    desc: 'Disable Nagle algorithm, tune TCP/UDP buffers, remove network throttling, optimize interrupt moderation, benchmark DNS providers for lowest ping.',
  },
  {
    step: '05',
    title: 'Startup',
    icon: '>>>',
    color: 'orange' as const,
    desc: 'Strip unnecessary startup programs and scheduled tasks. Configure boot settings for faster startup and consistent timer behavior.',
  },
  {
    step: '06',
    title: 'Cleaner',
    icon: 'CLR',
    color: 'cyan' as const,
    desc: 'Clean shader caches, temp files, Windows Update leftovers, browser data, and system junk. Reclaim gigabytes of wasted disk space.',
  },
  {
    step: '07',
    title: 'Tools',
    icon: '[ ]',
    color: 'purple' as const,
    desc: 'FPS overlay, GPU overclock profiles, RAM cleaner, DPC latency tester, input lag analyzer, one-click Windows activation (MAS HWID), and game essentials installer.',
  },
  {
    step: '08',
    title: 'Game Config',
    icon: 'CFG',
    color: 'pink' as const,
    desc: 'One-click competitive configs for CS2, Fortnite, Valorant, Apex, Rocket League, R6 Siege, Overwatch 2, COD Warzone, and more. Autoexec, launch options, and engine settings.',
  },
  {
    step: '09',
    title: 'Profiles',
    icon: '///',
    color: 'green' as const,
    desc: '5 built-in presets (Safe Gaming, Competitive FPS, Max Performance, Developer, Internet Cafe) plus per-game auto-optimization with GPU preference, CPU priority, and Defender exclusions.',
  },
  {
    step: '10',
    title: 'Monitor',
    icon: 'MON',
    color: 'cyan' as const,
    desc: 'Real-time sparkline dashboard with CPU, GPU, RAM, VRAM, Disk, and Network graphs. Baseline vs post-tweak comparison with export. Overlay mode for in-game monitoring.',
  },
  {
    step: '11',
    title: 'Virus Scan',
    icon: 'SCN',
    color: 'orange' as const,
    desc: '5-layer threat detector: autorun persistence, live process analysis, crypto miner detection, system tamper checks, and VirusTotal hash lookups. Quarantine and force-remove any threat.',
  },
  {
    step: '12',
    title: 'DeepFreeze',
    icon: 'ICE',
    color: 'purple' as const,
    desc: 'Golden image backup and restore for internet cafes. Snapshots files, registry (display, audio, power, mouse settings), and system state. One-click boot restore with HKLM registry recovery.',
  },
  {
    step: '13',
    title: 'BIOS Guide',
    icon: 'BIO',
    color: 'pink' as const,
    desc: 'Auto-detects your motherboard and CPU. Shows optimal BIOS settings for gaming. XMP/EXPO memory profile detection with speed comparison. Direct links to your BIOS update page.',
  },
  {
    step: '14',
    title: 'Windows Repair',
    icon: 'FIX',
    color: 'green' as const,
    desc: 'SFC scan, DISM repair, Windows Update reset, DLL re-registration, Store repair, and network stack reset. Fix corrupted files and broken updates in one click.',
  },
  {
    step: '15',
    title: 'App Uninstaller',
    icon: 'DEL',
    color: 'orange' as const,
    desc: 'Full app manager with icons, sizes, and deep clean. Force-remove stubborn apps along with leftover files, registry keys, services, and scheduled tasks.',
  },
  {
    step: '16',
    title: 'Driver Cleaner',
    icon: 'DRV',
    color: 'cyan' as const,
    desc: 'Built-in Display Driver Uninstaller. Detects your GPU and driver version, then cleanly removes all GPU driver files, registry entries, and services for a fresh reinstall.',
  },
  {
    step: '17',
    title: 'GPU Tools',
    icon: 'GPU',
    color: 'purple' as const,
    desc: 'Dedicated NVIDIA/AMD page with GPU detection. Launch NVIDIA Profile Inspector with optimized preset, debloat NVIDIA telemetry and services, or apply AMD power tweaks.',
  },
]

const faqs = [
  {
    q: 'Is UziTweaks safe to use?',
    a: 'Yes. A system restore point is created before any changes. Full restore scripts (.bat + .ps1) are generated automatically. Every registry change, service modification, and boot setting is logged and reversible. UziTweaks also includes a built-in 5-layer threat scanner to detect and remove malware.',
  },
  {
    q: 'Will this get me banned in competitive games?',
    a: 'No. UziTweaks only modifies Windows registry values, system services, power plans, and network stack parameters. It does not inject into, hook, or modify any game process or file. Anti-cheat services (RiotVanguard, EasyAntiCheat, BattlEye) and VR services (Meta Quest Link, SteamVR, Oculus) are explicitly protected and never disabled by any tweak.',
  },
  {
    q: 'What exactly does it change? Can I see the tweaks?',
    a: 'Every tweak is visible in the app with a checkbox. You choose what runs. The app shows real-time output of every registry key written, service disabled, and setting changed. Nothing runs hidden. The "Under the Hood" section on this page shows examples of actual modifications.',
  },
  {
    q: 'Is this just a script wrapper for free registry tweaks?',
    a: 'No. It\'s a full .NET 9 WPF application with hardware detection, per-game optimization across 5 launcher platforms, DPC latency testing, interrupt affinity setup, restore script generation, FACEIT AC diagnostics, a 5-layer threat scanner, game booster mode, and Windows repair tools. A lot more than what a batch script can do.',
  },
  {
    q: 'Does it detect my specific hardware?',
    a: 'Yes. It detects your CPU, GPU vendor, network adapter, core count, and RAM. Tweaks are applied based on your actual hardware, not one-size-fits-all.',
  },
  {
    q: 'How does the license work?',
    a: 'Free version includes 15 tweaks, cleaner, benchmark, and startup manager. Premium ($30 one-time) unlocks all 1500+ tweaks, game booster, network tuning, and more. Key is tied to your hardware ID (HWID). One license per machine. No subscriptions. Free updates forever.',
  },
  {
    q: 'What Windows versions are supported?',
    a: 'Windows 10 (21H2+) and Windows 11. 64-bit only. .NET 9 runtime is bundled with the app (no extra installs needed). Self-contained single-file binary.',
  },
  {
    q: 'Can I undo all changes?',
    a: 'Yes. Before applying any tweaks, UziTweaks creates a system restore point AND generates restore scripts (both .bat and .ps1) on your Desktop. There is also a dedicated Restore page inside the app. Every change is fully reversible.',
  },
  {
    q: 'Will this actually improve my FPS?',
    a: 'On a bloated Windows install with many background services and default settings, yes. Typical gains are 10-20% FPS increase and significant reduction in frame time spikes. Clean Windows installs will see smaller gains. The built-in Optimization Score benchmark shows exactly what was improved and by how much.',
  },
]

const whyUziTweaks = [
  {
    title: 'More Than Registry Tweaks',
    text: 'MSI mode for PCI devices, CPU interrupt affinity, MMCSS thread priority, timer resolution control, GPU preemption settings -- things that actually require understanding how Windows schedules work under the hood.',
    icon: '>>>',
  },
  {
    title: 'Fully Reversible',
    text: 'Every change is logged. Restore scripts (.bat + .ps1) are generated before anything runs. System restore point created automatically. If something feels off, one click undoes everything.',
    icon: '<->',
  },
  {
    title: 'Per-Game Detection',
    text: 'Scans Steam, Epic, EA, Ubisoft, and Battle.net for all installed games. Applies GPU preference, CPU priority, Defender exclusions, and fullscreen optimizations for each game individually.',
    icon: 'OPT',
  },
  {
    title: 'Input Latency Focus',
    text: 'NVIDIA pre-rendered frame reduction, USB device power management disable, raw mouse input enforcement, HPET disable, timer resolution set to 0.5ms. Built for competitive players who care about every millisecond.',
    icon: '///',
  },
]

const comparisonData = [
  { feature: 'Registry + System Tweaks', uzi: '1500+', manual: '10-20', other: '30-50' },
  { feature: 'DPC Latency Optimization', uzi: true, manual: false, other: false },
  { feature: 'CPU Power State Control', uzi: true, manual: false, other: false },
  { feature: 'NVIDIA Deep GPU Tweaks', uzi: true, manual: false, other: false },
  { feature: 'Timer Resolution (0.5ms)', uzi: true, manual: 'Needs ISLC', other: false },
  { feature: 'Interrupt Affinity Setup', uzi: true, manual: false, other: false },
  { feature: 'Raw Mouse Input Fix', uzi: true, manual: 'Partial', other: false },
  { feature: 'Per-Game Auto-Optimization', uzi: true, manual: false, other: false },
  { feature: 'Network Stack Tuning', uzi: true, manual: false, other: 'Basic' },
  { feature: 'USB / Input Device Tweaks', uzi: true, manual: false, other: false },
  { feature: 'Auto Restore System', uzi: true, manual: false, other: 'Partial' },
  { feature: 'FACEIT AC Diagnostics', uzi: true, manual: false, other: false },
  { feature: 'Built-in Threat Scanner', uzi: true, manual: false, other: false },
  { feature: 'Game Booster Mode', uzi: true, manual: false, other: 'Basic' },
  { feature: 'Windows Repair Tools', uzi: true, manual: false, other: false },
  { feature: 'App Uninstaller + Deep Clean', uzi: true, manual: false, other: 'Basic' },
  { feature: 'GPU Tools (NPI + Debloat)', uzi: true, manual: false, other: false },
  { feature: 'Built-in Driver Cleaner', uzi: true, manual: 'Separate app', other: false },
  { feature: 'VR / Anti-Cheat Protection', uzi: true, manual: false, other: false },
  { feature: 'Real-time Sparkline Monitoring', uzi: true, manual: false, other: false },
  { feature: 'Cafe Mode (DeepFreeze)', uzi: true, manual: false, other: false },
  { feature: 'Time to Optimize', uzi: '< 5 min', manual: '3-5 hours', other: '15-30 min' },
  { feature: 'Price', uzi: 'Free / $30 Premium', manual: 'Free (your time)', other: '$15-80/yr' },
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
  const [checkoutEmail, setCheckoutEmail] = useState('')
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')

  const handleCheckout = async () => {
    const email = checkoutEmail.trim()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setCheckoutError('Enter a valid email to receive your license key.')
      return
    }
    setCheckoutLoading(true)
    setCheckoutError('')
    try {
      const res = await fetch('https://uzitweaks-api.majmuniking3.workers.dev/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setCheckoutError(data.error || 'Failed to create payment. Try again.')
      }
    } catch {
      setCheckoutError('Network error. Please try again.')
    } finally {
      setCheckoutLoading(false)
    }
  }

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
  const tweakCount = useCountUp(500, 1500, trustRef.inView)


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
            WINDOWS GAMING OPTIMIZER
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line">UZI</span>
            <span className="hero-title-line hero-title-accent">TWEAKS</span>
          </h1>
          <p className="hero-motto">
            "Built by a gamer who lost one too many gunfights to a frame drop."
          </p>
          <p className="hero-subtitle">
            Reduce input delay and improve 1% lows for competitive games.
            <br />
            Every layer of Windows optimized in under 5 minutes. Fully reversible with one click.
          </p>
          <div className="hero-cta-row">
            <GlowButton
              variant="green"
              size="lg"
              href="https://github.com/uzitweaks/releases/releases/latest/download/UziTweaks.exe"
            >
              Download UziTweaks
            </GlowButton>
            <GlowButton
              variant="pink"
              size="lg"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Features
            </GlowButton>
          </div>
          <p className="hero-download-note">Free download. No account needed. 77MB, runs instantly. Upgrade to Premium for all 1500+ tweaks.</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">1500+</span>
              <span className="hero-stat-label">System Tweaks</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">20</span>
              <span className="hero-stat-label">Feature Pages</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">15+</span>
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
            <div className="trust-counter-label">System Optimizations</div>
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
              <span className="featured-logo-text">BattlEye</span>
              <span className="featured-logo-text">Steam</span>
              <span className="featured-logo-text">Epic Games</span>
              <span className="featured-logo-text">Battle.net</span>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots removed — users can download free version to see the app */}

      {/* ========== WHAT IT CHANGES (TRANSPARENCY) ========== */}
      <section className="tweak-list" id="tweaks">
        <div className="container">
          <h2 className="section-title">
            <span className="gradient-text">What It</span> Actually Changes
          </h2>
          <p className="section-subtitle">
            No mystery box. Here is exactly what UziTweaks does to your system.
          </p>
          <div className="tweak-categories">
            <div className="tweak-cat">
              <h4 className="tweak-cat-title tweak-cat-red">CPU + Scheduling</h4>
              <ul className="tweak-cat-list">
                <li>Win32PrioritySeparation foreground boost</li>
                <li>Disable CPU power throttling + C-states</li>
                <li>Thread quantum + priority separation tuning</li>
                <li>Core parking disabled (all cores active)</li>
                <li>MMCSS game thread priority + scheduling</li>
                <li>CPU idle state control</li>
                <li>Physical core affinity (no HT contention)</li>
              </ul>
            </div>
            <div className="tweak-cat">
              <h4 className="tweak-cat-title tweak-cat-orange">GPU + Display</h4>
              <ul className="tweak-cat-list">
                <li>NVIDIA pre-rendered frame reduction (D3PCLatency)</li>
                <li>GPU preemption disable</li>
                <li>PowerMizer force max performance</li>
                <li>Shader cache unlimited</li>
                <li>MPO (Multi-Plane Overlay) disable</li>
                <li>TDR timeout increase</li>
                <li>HDCP overhead removal</li>
                <li>MSI mode for GPU interrupts</li>
              </ul>
            </div>
            <div className="tweak-cat">
              <h4 className="tweak-cat-title tweak-cat-yellow">Network</h4>
              <ul className="tweak-cat-list">
                <li>Nagle algorithm disable</li>
                <li>NetworkThrottlingIndex bypass</li>
                <li>TCP congestion provider (CTCP)</li>
                <li>Interrupt moderation disable on NIC</li>
                <li>Flow control disable</li>
                <li>AFD/Winsock buffer optimization</li>
                <li>DNS latency benchmark</li>
                <li>ECN + auto-tuning disable</li>
              </ul>
            </div>
            <div className="tweak-cat">
              <h4 className="tweak-cat-title tweak-cat-green">Input + Latency</h4>
              <ul className="tweak-cat-list">
                <li>Timer resolution set to 0.5ms</li>
                <li>HPET disable (use TSC instead)</li>
                <li>Raw mouse input (1:1, no accel)</li>
                <li>USB selective suspend disable</li>
                <li>HID device power management off</li>
                <li>Mouse/keyboard data queue optimization</li>
                <li>DPC watchdog disable</li>
                <li>Interrupt affinity isolation</li>
              </ul>
            </div>
            <div className="tweak-cat">
              <h4 className="tweak-cat-title tweak-cat-blue">Memory + Storage</h4>
              <ul className="tweak-cat-list">
                <li>Kernel + drivers locked in RAM</li>
                <li>Prefetch/Superfetch disable</li>
                <li>NTFS timestamp + 8.3 name disable</li>
                <li>Page combining disable</li>
                <li>I/O page lock limit increase</li>
                <li>Windows Search indexer kill</li>
              </ul>
            </div>
            <div className="tweak-cat">
              <h4 className="tweak-cat-title tweak-cat-dim">Services + Debloat</h4>
              <ul className="tweak-cat-list">
                <li>50+ unnecessary services disabled</li>
                <li>Telemetry + diagnostics killed</li>
                <li>Game DVR / Game Bar removed</li>
                <li>NVIDIA telemetry tasks disabled</li>
                <li>Xbox services stopped</li>
                <li>Defender CPU limited to 15%</li>
                <li>Touch/pen/handwriting telemetry off</li>
              </ul>
            </div>
          </div>
          <p className="tweak-list-note">
            This is a fraction of what runs. The full pipeline applies over 1500 modifications across registry, services, power plans, BCD, network stack, and driver configs — all hardware-aware and fully reversible. Every tweak has a checkbox. You choose what runs.
          </p>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="features" id="features" ref={featuresRef.ref}>
        <div className={`container fade-in-section ${featuresRef.inView ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="gradient-text">Full</span> Optimization Pipeline
          </h2>
          <p className="section-subtitle">
            A complete workflow that takes your system from stock to fully optimized.
            Every step is automated, reversible, and thoroughly tested.
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
            Beyond the optimization pipeline, UziTweaks includes real-time performance tools and diagnostics.
          </p>
          <div className="extras-grid">
            <div className="extra-item">
              <div className="extra-icon-wrap pink">{'#01'}</div>
              <h4>Dual Benchmark</h4>
              <p>Optimization Score (0-100) checks your Windows settings against best practices. Hardware Score benchmarks CPU, disk, RAM, and network performance.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap cyan">{'FPS'}</div>
              <h4>FPS Overlay</h4>
              <p>Lightweight always-on-top FPS counter. Works with any game, near-zero performance impact.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap green">{'OPT'}</div>
              <h4>Game Optimizer</h4>
              <p>Scans Steam, Epic, EA, Ubisoft, and Battle.net for installed games. Applies GPU preference, CPU priority, Defender exclusions, and fullscreen settings per game.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap purple">{'CPU'}</div>
              <h4>Auto Process Priority</h4>
              <p>Detects game launches automatically and sets CPU priority, affinity, and I/O priority in real-time. No manual task manager work needed.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap orange">{'GPU'}</div>
              <h4>GPU Overclock Profiles</h4>
              <p>NVIDIA GPU overclock presets: core clock, memory clock, power limit, and fan curve. Tested for safe daily use.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap pink">{'AC/'}</div>
              <h4>FACEIT AC Diagnostics</h4>
              <p>8-point check: Secure Boot, TPM, VBS, unsigned drivers, service status, test signing, conflicting software, and Windows version.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap orange">{'SCN'}</div>
              <h4>5-Layer Threat Scanner</h4>
              <p>Scans autorun persistence, live processes, crypto miners, system tampering, and VirusTotal hashes. Quarantine or force-remove any threat found.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap green">{'BST'}</div>
              <h4>Game Booster</h4>
              <p>Kill bloatware, purge RAM, set 0.5ms timer, enable focus assist, and boost your game to high priority — all in one click before you queue.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap cyan">{'FIX'}</div>
              <h4>Windows Repair</h4>
              <p>SFC scan, DISM image repair, Windows Update reset, DLL re-registration, Store repair, and network stack reset. Fix system corruption fast.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap green">{'VR/'}</div>
              <h4>VR + Anti-Cheat Protection</h4>
              <p>Meta Quest Link, SteamVR, Oculus services are protected from all tweaks. RiotVanguard, EasyAntiCheat, and BattlEye are never touched. Game safely.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap purple">{'WIN'}</div>
              <h4>Activate Windows</h4>
              <p>One-click permanent Windows activation via Microsoft Activation Scripts (MAS) HWID method. Open-source, safe, no user interaction required.</p>
            </div>
            <div className="extra-item">
              <div className="extra-icon-wrap orange">{'SPK'}</div>
              <h4>Sparkline Dashboard</h4>
              <p>Real-time mini-graphs for CPU, GPU, RAM, VRAM, Disk I/O, and Network throughput. 60-point rolling history with baseline comparison and export.</p>
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
            A look at some of the actual registry keys and system calls UziTweaks modifies.
          </p>
          <div className="hood-grid">
            <div className="hood-item">
              <div className="hood-label">TIMER</div>
              <div className="hood-code">NtSetTimerResolution(5000, TRUE)</div>
              <div className="hood-desc">Set Windows timer to 0.5ms for smoother frame pacing</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">GPU</div>
              <div className="hood-code">D3PCLatency = 0x1</div>
              <div className="hood-desc">Reduce NVIDIA pre-rendered frame queue to 1 (lower input lag)</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">CPU</div>
              <div className="hood-code">Win32PrioritySeparation = 0x26</div>
              <div className="hood-desc">Prioritize foreground processes (your game) over background tasks</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">IRQ</div>
              <div className="hood-code">AssignmentSetOverride = 0x04</div>
              <div className="hood-desc">Pin GPU interrupts to a dedicated CPU core to avoid contention</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">NET</div>
              <div className="hood-code">NetworkThrottlingIndex = 0xFFFFFFFF</div>
              <div className="hood-desc">Disable Windows multimedia network throttling entirely</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">DPC</div>
              <div className="hood-code">DpcWatchdogPeriod = 0x0</div>
              <div className="hood-desc">Disable DPC watchdog to prevent forced timeout interruptions</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">MEM</div>
              <div className="hood-code">DisablePagingExecutive = 0x1</div>
              <div className="hood-desc">Keep drivers and kernel in RAM instead of paging to disk</div>
            </div>
            <div className="hood-item">
              <div className="hood-label">MOUSE</div>
              <div className="hood-code">MouseSpeed = 0 | Threshold = 0</div>
              <div className="hood-desc">1:1 raw mouse input, no acceleration, linear movement curve</div>
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
              <div className="step-icon-wrap">{'DWN'}</div>
              <h3>Download</h3>
              <p>Download UziTweaks for free. Try the cleaner, benchmark, and startup manager. Upgrade to Premium to unlock all 1500+ tweaks.</p>
            </div>
            <div className="step-connector">
              <div className="connector-line" />
              <div className="connector-arrow">{'>'}</div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon-wrap">{'>>>'}</div>
              <h3>Run</h3>
              <p>Launch UziTweaks and run the full optimization pipeline. 277 tweaks across CPU, GPU, network, memory, and power settings applied in minutes.</p>
            </div>
            <div className="step-connector">
              <div className="connector-line" />
              <div className="connector-arrow">{'>'}</div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon-wrap">{'!!!'}</div>
              <h3>Play</h3>
              <p>Restart your PC. Your system is now fully optimized with 20 pages of tools at your fingertips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRICING ========== */}
      <section className="pricing" id="pricing" ref={pricingRef.ref}>
        <div className={`container fade-in-section ${pricingRef.inView ? 'visible' : ''}`}>
          <h2 className="section-title">
            <span className="gradient-text">Choose Your</span> Plan
          </h2>
          <p className="section-subtitle">
            Download free and try it. Upgrade to Premium for the full arsenal.
          </p>
          <div className="pricing-grid">
            <NeonCard glow="cyan" hover={false} className="pricing-card">
              <div className="pricing-popular-badge">FREE</div>
              <div className="pricing-price">
                <span className="pricing-currency">$</span>
                <span className="pricing-amount">0</span>
              </div>
              <p className="pricing-note">No account {' | '} No email {' | '} Free updates</p>
              <ul className="pricing-features">
                <li><span className="check">{'//'}</span> 15 system optimization tweaks</li>
                <li><span className="check">{'//'}</span> Disk cleaner + temp file removal</li>
                <li><span className="check">{'//'}</span> System benchmark + scoring</li>
                <li><span className="check">{'//'}</span> Startup manager</li>
                <li><span className="check">{'//'}</span> Sparkline hardware monitor</li>
                <li><span className="check">{'//'}</span> BIOS guide + XMP/EXPO detection</li>
                <li><span className="check">{'//'}</span> System restore point creation</li>
                <li className="pricing-feature-disabled">{'--'} 1500+ advanced tweaks</li>
                <li className="pricing-feature-disabled">{'--'} Game booster + auto-optimizer</li>
                <li className="pricing-feature-disabled">{'--'} Network stack tuning</li>
              </ul>
              <GlowButton
                variant="green"
                size="lg"
                href="https://github.com/uzitweaks/releases/releases/latest/download/UziTweaks.exe"
                className="pricing-cta"
              >
                Download Free
              </GlowButton>
              <p className="pricing-secure">Windows 10/11 {' | '} 65MB {' | '} No installer</p>
            </NeonCard>

            <NeonCard glow="purple" hover={false} className="pricing-card pricing-card-premium">
              <div className="pricing-popular-badge pricing-badge-premium">PREMIUM</div>
              <div className="pricing-price">
                <span className="pricing-currency">$</span>
                <span className="pricing-amount">30</span>
              </div>
              <p className="pricing-note">One-time payment {' | '} Lifetime license {' | '} Free updates forever</p>
              <ul className="pricing-features">
                <li><span className="check">{'//'}</span> Everything in Free, plus:</li>
                <li><span className="check">{'//'}</span> All 1500+ system optimization tweaks</li>
                <li><span className="check">{'//'}</span> DPC latency + timer resolution tuning</li>
                <li><span className="check">{'//'}</span> CPU power state + scheduling control</li>
                <li><span className="check">{'//'}</span> NVIDIA GPU deep registry tweaks</li>
                <li><span className="check">{'//'}</span> Per-game auto-optimization engine</li>
                <li><span className="check">{'//'}</span> Network stack tuning + interrupt affinity</li>
                <li><span className="check">{'//'}</span> Aggressive service killer (VR/AC protected)</li>
                <li><span className="check">{'//'}</span> Game booster mode + Windows repair</li>
                <li><span className="check">{'//'}</span> 5-layer virus scanner + FACEIT AC</li>
                <li><span className="check">{'//'}</span> DeepFreeze cafe mode + Activate Windows</li>
              </ul>
              <div className="checkout-form">
                <input
                  type="email"
                  placeholder="Your email for license delivery"
                  value={checkoutEmail}
                  onChange={(e) => { setCheckoutEmail(e.target.value); setCheckoutError('') }}
                  className="checkout-email"
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckout()}
                />
                {checkoutError && <p className="checkout-error">{checkoutError}</p>}
                <GlowButton
                  variant="pink"
                  size="lg"
                  onClick={handleCheckout}
                  className="pricing-cta"
                >
                  {checkoutLoading ? 'Redirecting...' : 'Get Premium'}
                </GlowButton>
              </div>
              <p className="pricing-secure">Crypto payment via NOWPayments {' | '} HWID-locked {' | '} 1 PC {' | '} No subscriptions</p>
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
              Ready to <span className="gradient-text">Optimize</span>?
            </h2>
            <p className="final-cta-text">
              Stop losing frames to bloated Windows defaults.
              Get your system optimized in under 5 minutes.
            </p>
            <GlowButton
              variant="green"
              size="lg"
              href="https://github.com/uzitweaks/releases/releases/latest/download/UziTweaks.exe"
            >
              Download UziTweaks
            </GlowButton>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
