import {
  Routes, BrowserRouter as Router, Route
} from 'react-router-dom';
import Event from './pages/Event/Event.jsx';
import EventManager from './pages/EventManager/EventManager.jsx';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/:eventId' element={<Event/>} />
        <Route path='/' element={<EventManager/>} />
      </Routes>
    </Router>
  )
}

export default App
