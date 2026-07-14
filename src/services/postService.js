import axios from "axios"
import { ENDPOINTS } from "@/config/api"

export async function fetchPosts(params = {}) {
  const response = await axios.get(ENDPOINTS.posts, {
    params: {
      page: 1,
      limit: 6,
      ...params,
    },
  })

  return {
    posts: response.data.posts ?? [],
    nextPage: response.data.nextPage ?? null,
    currentPage: response.data.currentPage ?? 1,
    totalPages: response.data.totalPages ?? 1,
    totalPosts: response.data.totalPosts ?? 0,
  }
}

export async function fetchPostById(postId) {
  const response = await axios.get(`${ENDPOINTS.posts}/${postId}`)
  return response.data
}
