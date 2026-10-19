import { Stoplight } from './Stoplight'
import { StoplightState } from './stoplightStates'
import { TimerController, type TimerSchedule } from './TimerController'

export interface TimerStoplightProps {
  redMs?: number
  yellowMs?: number
  greenMs?: number
}

/** A `Stoplight` driven by a fixed red → green → yellow timer loop. */
export function TimerStoplight({
  redMs = 5000,
  yellowMs = 1000,
  greenMs = 2000,
}: TimerStoplightProps) {
  const steps: TimerSchedule<StoplightState> = [
    { state: StoplightState.Red, durationMs: redMs },
    { state: StoplightState.Green, durationMs: greenMs },
    { state: StoplightState.Yellow, durationMs: yellowMs },
  ]

  return (
    <TimerController steps={steps}>
      <Stoplight />
    </TimerController>
  )
}
