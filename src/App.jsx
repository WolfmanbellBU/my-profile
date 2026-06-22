import './App.css'
import Navbar from './components/Navbar.jsx'
import HeroSection from './components/HeroSection.jsx'

function App() {
  return (
    <div className="flex flex-col min-h-svh w-full">
      <Navbar />
      <HeroSection />
    </div>
  )
}

export default App
