import './App.css';
import './themeColor.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage/Homepage';
import Calendar, { CalendarWidget } from './components/Calendar/Calendar';
import Projects from './components/Projects/Projects';
import Project from './components/Project/Project';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/widget/calendar' element={<CalendarWidget />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/project' element={<Project />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;