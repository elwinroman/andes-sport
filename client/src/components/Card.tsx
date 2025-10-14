import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return <div className={`w-full bg-card sm:rounded-md overflow-hidden shadow-widget ${className}`}>{children}</div>
}
