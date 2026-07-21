import { useMemo, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ImageIcon, Trash2, X } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import {
  createArticle,
  deleteArticle,
  getArticleById,
  updateArticle,
} from "@/services/admin/articleStore"
import { getCategories } from "@/services/admin/categoryStore"

const INTRO_MAX = 120

export function ArticleFormPage() {
  const { articleId } = useParams()
  const isEdit = Boolean(articleId)
  const navigate = useNavigate()
  const { user } = useAuth()
  const fileInputRef = useRef(null)
  const categories = useMemo(() => getCategories(), [])
  const existing = isEdit ? getArticleById(articleId) : null

  const [form, setForm] = useState({
    title: existing?.title ?? "",
    category: existing?.category ?? "",
    introduction: existing?.introduction ?? "",
    content: existing?.content ?? "",
    image: existing?.image ?? "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  if (isEdit && !existing) {
    return (
      <div className="px-10 py-10">
        <p className="text-gray-600">Article not found.</p>
        <Link to="/admin/articles" className="text-sm text-black underline">
          Back to articles
        </Link>
      </div>
    )
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: name === "introduction" ? value.slice(0, INTRO_MAX) : value,
    }))
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: String(reader.result) }))
    }
    reader.readAsDataURL(file)
  }

  function validateForm() {
    if (
      !form.title.trim() ||
      !form.category ||
      !form.introduction.trim() ||
      !form.content.trim()
    ) {
      toast.error("Please fill in all required fields")
      return false
    }
    return true
  }

  async function handleSave(status) {
    if (!validateForm()) return
    setIsSaving(true)

    try {
      const payload = {
        ...form,
        status,
        author: user?.name || user?.username || "Thompson P.",
        authorId: user?.id ?? null,
      }

      if (isEdit) {
        updateArticle(articleId, payload)
        toast.success("Article updated", {
          description:
            status === "published"
              ? "Your article has been successfully published"
              : "Your article has been saved as draft",
        })
      } else if (status === "draft") {
        createArticle(payload)
        toast.success("Create article and saved as draft", {
          description: "You can publish article later",
        })
      } else {
        createArticle(payload)
        toast.success("Create article and published", {
          description: "Your article has been successfully published",
        })
      }

      navigate(`/admin/articles?status=${status}`)
    } catch (error) {
      toast.error(error.response?.data?.error ?? "Failed to save article")
    } finally {
      setIsSaving(false)
    }
  }

  function handleDelete() {
    try {
      deleteArticle(articleId)
      toast.success("Delete article", {
        description: "The article has been deleted successfully",
      })
      navigate("/admin/articles")
    } catch (error) {
      toast.error(error.response?.data?.error ?? "Failed to delete article")
    }
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-10 py-6">
        <h1 className="text-2xl font-bold text-black">
          {isEdit ? "Edit article" : "Create article"}
        </h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("draft")}
            className="rounded-full border border-gray-800 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50 disabled:opacity-60"
          >
            Save as draft
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => handleSave("published")}
            className="rounded-full bg-[#2b2a2a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black disabled:opacity-60"
          >
            {isEdit ? "Save" : "Save and publish"}
          </button>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-10 py-10">
        <div className="mb-6 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Thumbnail image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex items-center gap-4">
            {form.image ? (
              <img
                src={form.image}
                alt=""
                className="h-36 w-56 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-36 w-56 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-[#f8f9fa] text-gray-400">
                <ImageIcon className="size-10" strokeWidth={1.25} />
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full border border-gray-800 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
            >
              Upload thumbnail image
            </button>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Select
            value={form.category || undefined}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="h-12 w-full rounded-xl border-gray-300 bg-white px-4">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item.id} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Author name</label>
          <Input
            value={user?.name || user?.username || "Thompson P."}
            readOnly
            className="h-12 rounded-xl border-gray-300 bg-[#f3f3f3] px-4 text-gray-500"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Article title"
            className="h-12 rounded-xl border-gray-300 bg-white px-4"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label
            htmlFor="introduction"
            className="text-sm font-medium text-gray-700"
          >
            Introduction (max {INTRO_MAX} letters)
          </label>
          <Textarea
            id="introduction"
            name="introduction"
            value={form.introduction}
            onChange={handleChange}
            maxLength={INTRO_MAX}
            placeholder="Introduction"
            className="min-h-24 rounded-xl border-gray-300 bg-white px-4 py-3"
          />
        </div>

        <div className="mb-8 flex flex-col gap-2">
          <label htmlFor="content" className="text-sm font-medium text-gray-700">
            Content
          </label>
          <Textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content"
            className="min-h-72 rounded-xl border-gray-300 bg-white px-4 py-3"
          />
        </div>

        {isEdit && (
          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="inline-flex items-center gap-2 text-sm font-medium text-red-500 transition-colors hover:text-red-600"
          >
            <Trash2 className="size-4" />
            Delete article
          </button>
        )}
      </div>

      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent className="relative max-w-sm rounded-2xl p-8 sm:max-w-sm">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setShowDelete(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X className="size-5" />
          </button>
          <AlertDialogHeader className="place-items-center text-center sm:place-items-center sm:text-center">
            <AlertDialogTitle className="text-xl font-bold text-black">
              Delete article
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-[#757575]">
              Do you want to delete this article?
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
                handleDelete()
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
