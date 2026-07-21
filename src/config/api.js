const POSTS_API_BASE_URL = "https://blog-post-project-api.vercel.app"
const AUTH_API_BASE_URL = "https://blog-post-project-api-with-db.vercel.app"

export const ENDPOINTS = {
  posts: `${POSTS_API_BASE_URL}/posts`,
  auth: {
    register: `${AUTH_API_BASE_URL}/auth/register`,
    login: `${AUTH_API_BASE_URL}/auth/login`,
    getUser: `${AUTH_API_BASE_URL}/auth/get-user`,
    updateProfile: `${AUTH_API_BASE_URL}/auth/update-profile`,
    resetPassword: `${AUTH_API_BASE_URL}/auth/reset-password`,
  },
}
