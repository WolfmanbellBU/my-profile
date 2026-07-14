import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Input } from "@/components/ui/input"
import { registerUser } from "@/services/authService"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function SignUpPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  })
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setHasError(false)
  }

  function validateForm() {
    if (
      !form.name.trim() ||
      !form.username.trim() ||
      !form.email.trim() ||
      !form.password.trim()
    ) {
      toast.error("Please fill in all fields")
      return false
    }

    if (!EMAIL_PATTERN.test(form.email.trim())) {
      toast.error("Please enter a valid email address")
      return false
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return false
    }

    return true
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!validateForm()) {
      setHasError(true)
      return
    }

    setIsSubmitting(true)

    try {
      await registerUser(form)
      navigate("/registration-success")
    } catch (error) {
      setHasError(true)
      const message =
        error.response?.data?.error ?? "Failed to create account. Please try again."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClassName = hasError
    ? "h-12 rounded-xl border-red-500 bg-white px-4 text-red-500 placeholder:text-red-300 focus-visible:border-red-500 focus-visible:ring-red-500/20"
    : "h-12 rounded-xl border-gray-300 bg-white px-4 text-gray-800 placeholder:text-gray-400"

  return (
    <div className="flex min-h-svh w-full flex-col bg-[#f8f9fa]">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[520px] rounded-2xl bg-[#efeeeb] px-8 py-10 sm:px-12 sm:py-12">
          <h1 className="mb-8 text-center text-3xl font-bold text-black">
            Sign up
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                className={inputClassName}
                aria-invalid={hasError}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className={inputClassName}
                aria-invalid={hasError}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={inputClassName}
                aria-invalid={hasError}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={inputClassName}
                aria-invalid={hasError}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-full bg-[#2b2a2a] py-3 text-sm font-medium text-white transition-colors hover:bg-black disabled:opacity-60"
            >
              Sign up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-black underline">
              Log in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
