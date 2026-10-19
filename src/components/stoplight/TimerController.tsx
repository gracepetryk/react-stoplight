import { useEffect, useState, type ReactNode } from 'react'
import {
  LightControllerContext,
  matchState,
  type LightController,
} from './lightController'

export interface TimedStep<S> {
  state: S
  durationMs: number
}

/** At least one step, enforced at compile time. */
export type TimerSchedule<S> = readonly [TimedStep<S>, ...TimedStep<S>[]]

function validateSteps<S>(steps: TimerSchedule<S>) {
  // The type forbids an empty schedule, but casts and plain JS callers can still pass one.
  if (steps.length === 0) {
    throw new Error('TimerController requires at least one step')
  }
  steps.forEach(({ durationMs }, i) => {
    if (!Number.isFinite(durationMs) || durationMs <= 0) {
      throw new Error(
        `Duration for step ${i} must be a positive number of ms, got ${durationMs}`,
      )
    }
  })
}

export interface TimerControllerProps<S> {
  /** Changing the current step's duration restarts its timer. */
  steps: TimerSchedule<S>
  children: ReactNode
}

/**
 * Cycles through `steps` in order, holding each state for its `durationMs`,
 * and loops forever. Lights rendered inside it display the current state.
 */
export function TimerController<S>({ steps, children }: TimerControllerProps<S>) {
  validateSteps(steps)

  const [index, setIndex] = useState(0)
  // `steps` may have shrunk since `index` was set.
  const step = steps[index % steps.length]

  // Keyed on the index, not the step object: a schedule may reuse the same
  // step object, and replacing `steps` shouldn't restart an unchanged step.
  useEffect(() => {
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % steps.length),
      step.durationMs,
    )
    return () => clearTimeout(timer)
  }, [index, step.durationMs, steps.length])

  // A new object each render, so lights re-render whenever the step changes.
  const controller: LightController = {
    getLightState: (type) => matchState(type, step.state),
  }

  return <LightControllerContext value={controller}>{children}</LightControllerContext>
}
