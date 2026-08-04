import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import { AuthProvider } from "@/context/AuthContext"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { HomePage } from "@/pages/HomePage"
import { ViewPostPage } from "@/pages/ViewPostPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { LoginPage } from "@/pages/LoginPage"
import { SignUpPage } from "@/pages/SignUpPage"
import { RegistrationSuccessPage } from "@/pages/RegistrationSuccessPage"
import { ArticleManagementPage } from "@/pages/admin/ArticleManagementPage"
import { ArticleFormPage } from "@/pages/admin/ArticleFormPage"
import { CategoryManagementPage } from "@/pages/admin/CategoryManagementPage"
import { CategoryFormPage } from "@/pages/admin/CategoryFormPage"
import { NotificationsPage } from "@/pages/admin/NotificationsPage"
import { ProfilePage } from "@/pages/admin/ProfilePage"
import { ResetPasswordPage } from "@/pages/admin/ResetPasswordPage"
import HealthTestPage from "./pages/HealthTestPage"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:postId" element={<ViewPostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/registration-success"
          element={<RegistrationSuccessPage />}
        />
        <Route path="/test-health" element={<HealthTestPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="articles" replace />} />
          <Route path="articles" element={<ArticleManagementPage />} />
          <Route path="articles/create" element={<ArticleFormPage />} />
          <Route
            path="articles/:articleId/edit"
            element={<ArticleFormPage />}
          />
          <Route path="categories" element={<CategoryManagementPage />} />
          <Route path="categories/create" element={<CategoryFormPage />} />
          <Route
            path="categories/:categoryId/edit"
            element={<CategoryFormPage />}
          />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="bottom-right" richColors closeButton />
    </AuthProvider>
  )
}

export default App
