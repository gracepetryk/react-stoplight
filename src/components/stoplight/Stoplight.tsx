import { Bulb } from './Bulb'
import { useLightState, type LightType } from './lightController'
import { StoplightState } from './stoplightStates'
import './Stoplight.css'

const BULBS = [
  { id: 'red', color: '#ff3b30' },
  { id: 'yellow', color: '#ffcc00' },
  { id: 'green', color: '#34c759' },
] as const
type BulbId = (typeof BULBS)[number]['id']

// States map to sets of bulbs so a single state can light several bulbs
// (e.g. red + a turn arrow).
const LIT_BULBS: Record<StoplightState, readonly BulbId[]> = {
  [StoplightState.Red]: ['red'],
  [StoplightState.Yellow]: ['yellow'],
  [StoplightState.Green]: ['green'],
}

const STOPLIGHT: LightType<StoplightState> = {
  states: Object.values(StoplightState),
  stopState: StoplightState.Red,
}

/**
 * A red/yellow/green traffic light that displays the state of the nearest
 * controller.
 */
export function Stoplight() {
  const state = useLightState(STOPLIGHT)
  const lit = LIT_BULBS[state]

  return (
    <div className="stoplight" role="img" aria-label={`Stoplight showing ${state}`}>
      {BULBS.map(({ id, color }) => (
        <Bulb key={id} color={color} lit={lit.includes(id)} />
      ))}
    </div>
  )
}
