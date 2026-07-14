import axios from "axios"
import { ENDPOINTS } from "@/config/api"

export async function registerUser({ name, username, email, password }) {
  const response = await axios.post(ENDPOINTS.auth.register, {
    name,
    username,
    email,
    password,
  })
  return response.data
}

export async function loginUser({ email, password }) {
  const response = await axios.post(ENDPOINTS.auth.login, {
    email,
    password,
  })
  return response.data
}

export async function fetchCurrentUser(accessToken) {
  const response = await axios.get(ENDPOINTS.auth.getUser, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data
}
