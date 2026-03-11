import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SuccessPage from './pages/SuccessPage'
import CancelPage from './pages/CancelPage'

function App() {
  return (
    <div className="app">
      <div className="scanline-overlay" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
