import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BlogCardList } from "@/components/BlogCard"
import { blogPosts } from "@/data/blogPosts"

const categories = ["Highlight", "Cat", "Inspiration", "General"]

function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("Highlight")

  const handleCategoryChange = (value) => {
    if (value) {
      setSelectedCategory(value)
    }
  }

  const filteredPosts =
    selectedCategory === "Highlight"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory)

  return (
    <section className="w-full bg-white px-8 py-10">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold !text-black">Latest articles</h2>

        {/* Desktop */}
        <div className="hidden md:block rounded-2xl bg-[#ebe9e4] px-4 py-3">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-1">
              {categories.map((category) => (
                <Button
                  key={category}
                  type="button"
                  variant="ghost"
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-lg border-0 px-4 py-2 text-sm hover:bg-transparent ${
                    selectedCategory === category
                      ? "bg-[#d9d7d2] font-medium text-[#43403b] hover:bg-[#d9d7d2]"
                      : "bg-transparent text-[#757575] hover:text-[#757575]"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="relative w-72 shrink-0">
              <Input
                type="text"
                placeholder="Search"
                readOnly
                className="h-10 border-0 bg-white pr-10 shadow-none focus-visible:ring-0"
              />
              <Search
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#757575]"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden rounded-2xl bg-[#ebe9e4] px-4 py-5">
          <div className="flex flex-col gap-5">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search"
                readOnly
                className="h-11 border-0 bg-white pr-10 shadow-none focus-visible:ring-0"
              />
              <Search
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#757575]"
                strokeWidth={2}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="category-select" className="text-sm text-[#757575]">
                Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger
                  id="category-select"
                  className="h-11 w-full border-0 bg-white text-[#43403b] shadow-none focus-visible:ring-0"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <BlogCardList posts={filteredPosts} />
        </div>
      </div>
    </section>
  )
}

export default ArticleSection
