import { createContext, useContext, useMemo, useState } from "react"
import { fetchCurrentUser } from "@/services/authService"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("access_token")
  })

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isLoggedIn: Boolean(accessToken && user),
      login: async (token) => {
        const userData = await fetchCurrentUser(token)
        localStorage.setItem("access_token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setAccessToken(token)
        setUser(userData)
      },
      logout: () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("user")
        setAccessToken(null)
        setUser(null)
      },
    }),
    [user, accessToken]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
