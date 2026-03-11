import { type ReactNode, type CSSProperties } from 'react'
import './GlowButton.css'

interface GlowButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'cyan' | 'pink' | 'green'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  style?: CSSProperties
  className?: string
  disabled?: boolean
}

function GlowButton({
  children,
  onClick,
  variant = 'cyan',
  size = 'md',
  href,
  style,
  className = '',
  disabled = false,
}: GlowButtonProps) {
  const classes = `glow-button glow-${variant} glow-${size} ${className} ${disabled ? 'disabled' : ''}`

  if (href) {
    return (
      <a href={href} className={classes} style={style} target="_blank" rel="noopener noreferrer">
        <span className="glow-button-bg" />
        <span className="glow-button-content">{children}</span>
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} style={style} disabled={disabled}>
      <span className="glow-button-bg" />
      <span className="glow-button-content">{children}</span>
    </button>
  )
}

export default GlowButton
