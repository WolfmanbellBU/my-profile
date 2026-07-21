import { ARTICLE_CATEGORIES } from "@/constants/categories"

const CATEGORIES_KEY = "hh_admin_categories"

function readCategories() {
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }

  const seeded = ARTICLE_CATEGORIES.filter((name) => name !== "Highlight").map(
    (name) => ({
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  )
  writeCategories(seeded)
  return seeded
}

function writeCategories(categories) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
}

export function getCategories({ keyword = "" } = {}) {
  const query = keyword.trim().toLowerCase()
  const categories = readCategories().sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  if (!query) return categories
  return categories.filter((category) =>
    category.name.toLowerCase().includes(query)
  )
}

export function getCategoryById(id) {
  return readCategories().find((category) => category.id === id) ?? null
}

export function createCategory({ name }) {
  const trimmed = name.trim()
  if (!trimmed) {
    const error = new Error("Category name is required")
    error.response = { data: { error: "Category name is required" } }
    throw error
  }

  const categories = readCategories()
  if (
    categories.some(
      (category) => category.name.toLowerCase() === trimmed.toLowerCase()
    )
  ) {
    const error = new Error("This category already exists")
    error.response = { data: { error: "This category already exists" } }
    throw error
  }

  const category = {
    id: crypto.randomUUID(),
    name: trimmed,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  writeCategories([category, ...categories])
  return category
}

export function updateCategory(id, { name }) {
  const trimmed = name.trim()
  if (!trimmed) {
    const error = new Error("Category name is required")
    error.response = { data: { error: "Category name is required" } }
    throw error
  }

  const categories = readCategories()
  const index = categories.findIndex((category) => category.id === id)
  if (index === -1) {
    const error = new Error("Category not found")
    error.response = { data: { error: "Category not found" } }
    throw error
  }

  if (
    categories.some(
      (category, i) =>
        i !== index && category.name.toLowerCase() === trimmed.toLowerCase()
    )
  ) {
    const error = new Error("This category already exists")
    error.response = { data: { error: "This category already exists" } }
    throw error
  }

  categories[index] = {
    ...categories[index],
    name: trimmed,
    updatedAt: new Date().toISOString(),
  }
  writeCategories(categories)
  return categories[index]
}

export function deleteCategory(id) {
  const categories = readCategories()
  const next = categories.filter((category) => category.id !== id)
  if (next.length === categories.length) {
    const error = new Error("Category not found")
    error.response = { data: { error: "Category not found" } }
    throw error
  }
  writeCategories(next)
}
