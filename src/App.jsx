import './App.css'
import { Navbar } from './components/Navbar.jsx'
import { HeroSection } from './components/HeroSection.jsx'
import ArticleSection from './components/ArticleSection.jsx'
import { Footer } from './components/Footer.jsx'

function App() {
  return (
    <div className="flex flex-col min-h-svh w-full">
      <Navbar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  )
}

export default App
