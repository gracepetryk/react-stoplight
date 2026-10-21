import { Stoplight, type StoplightProps } from './Stoplight'
import { StoplightState } from './stoplightStates'
import { useTimerSchedule, type TimerSchedule } from './useTimerSchedule'

const DEFAULT_STEPS: TimerSchedule<StoplightState[]> = [
  { states: [StoplightState.Red], durationMs: 5000 },
  { states: [StoplightState.Green], durationMs: 2000 },
  { states: [StoplightState.Yellow], durationMs: 1000 },
]

export interface TimerStoplightProps extends Omit<StoplightProps, 'states'> {
  /** Defaults to a red → green → yellow loop. */
  steps?: TimerSchedule<StoplightState[]>
}

/** A `Stoplight` driven by a timer loop over `steps`. */
export function TimerStoplight({ steps = DEFAULT_STEPS, bulbs }: TimerStoplightProps) {
  const states = useTimerSchedule(steps)
  return <Stoplight states={states} bulbs={bulbs} />
}
