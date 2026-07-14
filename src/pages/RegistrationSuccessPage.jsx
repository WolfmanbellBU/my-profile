import { Link } from "react-router-dom"
import { Check } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"

export function RegistrationSuccessPage() {
  return (
    <div className="flex min-h-svh w-full flex-col bg-[#f8f9fa]">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-[520px] flex-col items-center rounded-2xl bg-[#efeeeb] px-8 py-12 sm:px-12 sm:py-14">
          <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check className="size-8" strokeWidth={3} />
          </div>

          <h1 className="mb-8 text-center text-3xl font-bold text-black">
            Registration success
          </h1>

          <Button
            asChild
            className="rounded-full bg-[#2b2a2a] px-10 py-6 text-base font-medium text-white hover:bg-black"
          >
            <Link to="/login">Continue</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
