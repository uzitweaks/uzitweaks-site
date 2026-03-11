import { type ReactNode } from 'react'
import './NeonCard.css'

interface NeonCardProps {
  children: ReactNode
  glow?: 'cyan' | 'purple' | 'pink' | 'green' | 'orange'
  className?: string
  hover?: boolean
}

function NeonCard({ children, glow = 'cyan', className = '', hover = true }: NeonCardProps) {
  return (
    <div className={`neon-card neon-card-${glow} ${hover ? 'neon-card-hover' : ''} ${className}`}>
      <div className="neon-card-border" />
      <div className="neon-card-content">
        {children}
      </div>
    </div>
  )
}

export default NeonCard
