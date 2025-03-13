import './App.css';
import './themeColor.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage/Homepage';
import Calendar, { CalendarWidget } from './components/Calendar/Calendar';
import Projects from './components/Projects/Projects';
import Project from './components/Project/Project';
import BloomBoard from './components/Project/Project.BloomBoard/BloomBoard';
import BloomBoardApp from './components/BloomboardApp/Bloomboard/Bloomboard';
import NoPageFound from './components/NoPageFound/NoPageFound';
import BBDashboard from './components/BloomboardApp/BloomboardDashboard/BBDashboard';
import BBDetail from './components/BloomboardApp/BloomboardDetail/BloomboardDetail';
import { ClassList } from './components/BloomboardApp/BloomboardDashboard/BBDashboard';


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
          <Route path='/project/bloomboard' element={<BloomBoard />} />
          <Route path='/bloomboard' element={<BloomBoardApp />} />
          <Route path='/Bloomboard/Dashboard' element={<BBDashboard />} />
          <Route path='/Bloomboard/ClassList' element={<ClassList />} />
          <Route path='/Bloomboard/Dashboard/:key' element={<BBDetail />} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;