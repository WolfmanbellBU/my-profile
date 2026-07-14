import { useNavigate } from "react-router-dom"
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

export function LoginAlertDialog({ open, onOpenChange }) {
  const navigate = useNavigate()

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm rounded-2xl p-6 sm:max-w-sm">
        <AlertDialogHeader className="place-items-center text-center sm:place-items-center sm:text-center">
          <AlertDialogTitle className="text-xl font-bold text-black">
            Create an account to continue
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-[#757575]">
            Log in or sign up to like articles and leave comments.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
          <AlertDialogAction
            className="w-full rounded-full bg-[#2b2a2a] text-white hover:bg-black"
            onClick={() => navigate("/login")}
          >
            Log in
          </AlertDialogAction>
          <AlertDialogCancel
            className="w-full rounded-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
