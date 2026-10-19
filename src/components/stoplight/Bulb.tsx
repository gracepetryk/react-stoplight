import type { CSSProperties } from 'react'
import './Bulb.css'

export interface BulbProps {
  /** Any CSS color; the lens is tinted with it and glows with it when lit. */
  color: string
  lit: boolean
}

export function Bulb({ color, lit }: BulbProps) {
  return (
    <div
      className={lit ? 'bulb bulb--lit' : 'bulb'}
      style={{ '--bulb-color': color } as CSSProperties}
      aria-hidden="true"
    />
  )
}
