const API_BASE_URL = "https://blog-post-project-api.vercel.app"

export const ENDPOINTS = {
  posts: `${API_BASE_URL}/posts`,
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    getUser: `${API_BASE_URL}/auth/get-user`,
  },
}
