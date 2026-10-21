import { Bulb } from './Bulb'
import type { StoplightState } from './stoplightStates'
import './Stoplight.css'

type BulbId = 'red' | 'yellow' | 'green'

export interface StoplightBulb {
  /** Which signal this bulb shows; it lights whenever the state includes it. */
  id: BulbId
  /** Any CSS color. */
  color: string
}

const DEFAULT_BULBS: readonly StoplightBulb[] = [
  { id: 'red', color: '#ff3b30' },
  { id: 'yellow', color: '#ffcc00' },
  { id: 'green', color: '#34c759' },
]

export interface StoplightProps {
  /** The signals currently lit. */
  states: readonly StoplightState[]
  /** Rendered top to bottom. Defaults to red, yellow, green. */
  bulbs?: readonly StoplightBulb[]
}

/** A traffic light that lights each bulb whose id is in `states`. */
export function Stoplight({ states, bulbs = DEFAULT_BULBS }: StoplightProps) {
  return (
    <div className="stoplight" role="img">
      {bulbs.map(({ id, color }) => (
        <Bulb key={id} color={color} lit={states.includes(id)} />
      ))}
    </div>
  )
}
