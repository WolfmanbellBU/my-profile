import { Link } from "react-router-dom"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-gray-200 bg-[#f8f9fa] px-8 py-4">
      <Link
        to="/"
        className="cursor-pointer text-3xl font-semibold tracking-tight text-gray-800 no-underline"
      >
        hh<span className="text-emerald-500">.</span>
      </Link>

      <div className="hidden items-center gap-3 md:flex">
        <Link
          to="/login"
          className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 no-underline transition-colors hover:bg-gray-50"
        >
          Log in
        </Link>
        <Link
          to="/signup"
          className="rounded-full bg-[#2b2a2a] px-6 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-black"
        >
          Sign up
        </Link>
      </div>

      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Open menu"
              className="size-10 rounded-sm border-gray-300 bg-white text-gray-700 shadow-none hover:bg-gray-50"
            >
              <Menu className="size-5" strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-auto min-w-40">
            <DropdownMenuItem asChild className="cursor-pointer justify-center py-2.5 text-sm font-medium text-gray-700">
              <Link to="/login">Log in</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer justify-center py-2.5 text-sm font-medium text-gray-700">
              <Link to="/signup">Sign up</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
