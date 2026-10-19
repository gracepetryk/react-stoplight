import { TimerStoplight } from './components/stoplight'
import './App.css'

function App() {
  return (
    <main className="app">
      <h1>Stoplight</h1>
      <TimerStoplight redMs={5000} yellowMs={1000} greenMs={2000} />
    </main>
  )
}

export default App
