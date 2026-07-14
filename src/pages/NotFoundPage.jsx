import { Link } from "react-router-dom"
import { CircleAlert } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <div className="flex min-h-svh w-full flex-col bg-white">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center px-8 py-20">
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-black text-white">
          <CircleAlert className="size-8" strokeWidth={2} />
        </div>
        <h1 className="mb-8 text-4xl font-bold !text-black md:text-5xl">
          Page Not Found
        </h1>
        <Button
          asChild
          className="rounded-full bg-[#2b2a2a] px-8 py-6 text-base font-medium text-white hover:bg-black"
        >
          <Link to="/">Go To Homepage</Link>
        </Button>
      </main>

      <Footer />
    </div>
  )
}
