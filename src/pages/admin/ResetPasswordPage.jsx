import { useState } from "react"
import { toast } from "sonner"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/context/AuthContext"

export function ResetPasswordPage() {
  const { resetPassword } = useAuth()
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function validateForm() {
    if (
      !form.currentPassword.trim() ||
      !form.newPassword.trim() ||
      !form.confirmPassword.trim()
    ) {
      toast.error("Please fill in all fields")
      return false
    }
    if (form.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters")
      return false
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New password and confirm password do not match")
      return false
    }
    return true
  }

  function handleOpenConfirm() {
    if (!validateForm()) return
    setShowConfirm(true)
  }

  async function handleReset() {
    setIsSubmitting(true)
    try {
      await resetPassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
      setShowConfirm(false)
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast.success("Password reset", {
        description: "Your password has been successfully updated",
      })
    } catch (error) {
      toast.error(
        error.response?.data?.error ?? "Failed to reset password. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-10 py-6">
        <h1 className="text-2xl font-bold text-black">Reset password</h1>
        <button
          type="button"
          onClick={handleOpenConfirm}
          disabled={isSubmitting}
          className="rounded-full bg-[#2b2a2a] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black disabled:opacity-60"
        >
          Reset password
        </button>
      </header>

      <div className="w-full max-w-xl px-10 py-10">
        <form
          className="flex flex-col gap-5"
          onSubmit={(event) => {
            event.preventDefault()
            handleOpenConfirm()
          }}
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium text-gray-700"
            >
              Current password
            </label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Current password"
              value={form.currentPassword}
              onChange={handleChange}
              className="h-12 rounded-xl border-gray-300 bg-white px-3"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              New password
            </label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New password"
              value={form.newPassword}
              onChange={handleChange}
              className="h-12 rounded-xl border-gray-300 bg-white px-3"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm new password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="h-12 rounded-xl border-gray-300 bg-white px-3"
            />
          </div>
        </form>
      </div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="relative max-w-sm rounded-2xl p-6 sm:max-w-sm">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setShowConfirm(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X className="size-5" />
          </button>
          <AlertDialogHeader className="place-items-center text-center sm:place-items-center sm:text-center">
            <AlertDialogTitle className="text-xl font-bold text-black">
              Reset password
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-[#757575]">
              Do you want to reset your password?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-center gap-3 sm:justify-center sm:space-x-0">
            <AlertDialogCancel className="mt-0 rounded-full border-gray-800 bg-white px-8 text-gray-800 hover:bg-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full bg-[#2b2a2a] px-8 text-white hover:bg-black"
              onClick={(event) => {
                event.preventDefault()
                handleReset()
              }}
              disabled={isSubmitting}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
