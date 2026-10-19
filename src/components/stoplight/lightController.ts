import { createContext, use } from 'react'

/** What every kind of light must declare to read its state from a controller. */
export interface LightType<S> {
  /** Every state this light can display. */
  states: readonly S[]
  /** One of `states`, shown whenever the light has no usable state, e.g. solid red. */
  stopState: S
}

/** Provided by controller components to the lights inside them. */
export interface LightController {
  /** The current state for this kind of light, or undefined if there is none. */
  getLightState<S>(type: LightType<S>): S | undefined
}

export const LightControllerContext = createContext<LightController | null>(null)

function isState<S>(type: LightType<S>, value: unknown): value is S {
  return (type.states as readonly unknown[]).includes(value)
}

/** `value` if it is one of `type`'s states, otherwise undefined. */
export function matchState<S>(type: LightType<S>, value: unknown): S | undefined {
  return isState(type, value) ? value : undefined
}

/**
 * Reads this light's state from the nearest controller. Falls back to
 * `type.stopState` and logs an error if there is no controller or it has no
 * state for this light.
 */
export function useLightState<S>(type: LightType<S>): S {
  const controller = use(LightControllerContext)

  if (!controller) {
    console.error('Light is not inside a controller, e.g. <TimerController>; showing its stop state')
    return type.stopState
  }

  const state = controller.getLightState(type)
  if (state === undefined) {
    console.error('Light has no state from its controller; showing its stop state')
    return type.stopState
  }
  return state
}
