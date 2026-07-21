import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "@/services/admin/categoryStore"

export function CategoryFormPage() {
  const { categoryId } = useParams()
  const isEdit = Boolean(categoryId)
  const navigate = useNavigate()
  const existing = isEdit ? getCategoryById(categoryId) : null
  const [name, setName] = useState(existing?.name ?? "")
  const [isSaving, setIsSaving] = useState(false)

  if (isEdit && !existing) {
    return (
      <div className="px-10 py-10">
        <p className="text-gray-600">Category not found.</p>
        <Link to="/admin/categories" className="text-sm text-black underline">
          Back to categories
        </Link>
      </div>
    )
  }

  function handleSave() {
    setIsSaving(true)
    try {
      if (isEdit) {
        updateCategory(categoryId, { name })
        toast.success("Edit category", {
          description: "Category has been successfully updated.",
        })
      } else {
        createCategory({ name })
        toast.success("Create category", {
          description: "Category has been successfully created.",
        })
      }
      navigate("/admin/categories")
    } catch (error) {
      toast.error(error.response?.data?.error ?? "Failed to save category")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-10 py-6">
        <h1 className="text-2xl font-bold text-black">
          {isEdit ? "Edit category" : "Create category"}
        </h1>
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="rounded-full bg-[#2b2a2a] px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black disabled:opacity-60"
        >
          Save
        </button>
      </header>

      <div className="mx-auto w-full max-w-xl px-10 py-10">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="categoryName"
            className="text-sm font-medium text-gray-700"
          >
            Category name
          </label>
          <Input
            id="categoryName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Category name"
            className="h-12 rounded-xl border-gray-300 bg-white px-4"
          />
        </div>
      </div>
    </div>
  )
}
