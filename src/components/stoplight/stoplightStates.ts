export const StoplightState = {
  Red: 'red',
  Yellow: 'yellow',
  Green: 'green',
} as const

export type StoplightState = (typeof StoplightState)[keyof typeof StoplightState]
