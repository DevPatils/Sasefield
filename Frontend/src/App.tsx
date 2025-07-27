import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Auth from './Pages/Auth'
import Navbar from './component/Navbar'
import SignInPage from './component/signin'
import StudentDashboard from './component/Dashboard'
import AllJobs from './component/Alljobs'
import AdminDashboard from './component/AdminDashboard'
import Getmyjobsadmin from './component/Getmyjobsadmin'

// Import other pages as needed


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<SignInPage/>}/>
        <Route path="/signup" element={<Auth/>}/>
        <Route path="/student-dashboard" element={<StudentDashboard/>}/>
        <Route path="/alljobs" element={<AllJobs/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path='/admin-jobs' element={<Getmyjobsadmin/>}/>
      </Routes>
    </Router>
  )
}

export default App
