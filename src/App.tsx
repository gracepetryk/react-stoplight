import {
  StoplightState,
  TimerStoplight,
  type StoplightBulb,
  type TimerSchedule,
} from './components/stoplight'
import './App.css'

const RED_YELLOW_GREEN_STEPS: TimerSchedule<StoplightState[]> = [
  { states: [StoplightState.Red], durationMs: 5000 },
  { states: [StoplightState.Yellow], durationMs: 1000 },
  { states: [StoplightState.Green], durationMs: 2000 },
]

const RED_YELLOW_OFF_STEPS: TimerSchedule<StoplightState[]> = [
  { states: [StoplightState.Red], durationMs: 1000 },
  { states: [StoplightState.Yellow], durationMs: 1000 },
  { states: [], durationMs: 1000 },
]

const RED_PLUS_YELLOW__GREN_STEPS: TimerSchedule<StoplightState[]> = [
  { states: [StoplightState.Red, StoplightState.Yellow], durationMs: 1000 },
  { states: [StoplightState.Green], durationMs: 1000 },
]

const ALL_RED_BULBS: StoplightBulb[] = [
  { id: 'red', color: '#ff3b30' },
  { id: 'yellow', color: '#ff3b30' },
  { id: 'green', color: '#ff3b30' },
]

function App() {
  return (
    <main className="app">
      <h1>Stoplight</h1>
      <div className="stoplights">
        <TimerStoplight />
        <TimerStoplight steps={RED_YELLOW_GREEN_STEPS} />
        <TimerStoplight steps={RED_YELLOW_OFF_STEPS} />
        <TimerStoplight steps={RED_PLUS_YELLOW__GREN_STEPS} />
        <TimerStoplight steps={RED_YELLOW_GREEN_STEPS} bulbs={ALL_RED_BULBS} />
      </div>
    </main>
  )
}

export default App
