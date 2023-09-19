import {
  Routes, BrowserRouter as Router, Route
} from 'react-router-dom';
import Event from './pages/Event/Event.jsx';
import './App.css'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/:eventId' element={<Event/>} />
      </Routes>
    </Router>
  )
}

export default App
