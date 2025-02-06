import './App.css';
import './themeColor.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage/Homepage';
import Calendar, { CalendarWidget } from './components/Calendar/Calendar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/widget/calendar' element={<CalendarWidget />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;