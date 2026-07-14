import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/home/HeroSection"
import ArticleSection from "@/components/articles/ArticleSection"

export function HomePage() {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <Navbar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  )
}
