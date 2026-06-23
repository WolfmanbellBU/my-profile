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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import BlogCard from "@/components/BlogCard"
import { blogPosts } from "@/data/blogPosts"

const categories = ["Highlight", "Cat", "Inspiration", "Ganeral"]

function ArticleSection() {
  const [selectedCategory, setSelectedCategory] = useState("Highlight")

  const handleCategoryChange = (value) => {
    if (value) {
      setSelectedCategory(value)
    }
  }

  return (
    <section className="w-full bg-white px-8 py-10">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold !text-black">Latest articles</h2>

        {/* Desktop */}
        <div className="hidden md:block rounded-2xl bg-[#ebe9e4] px-4 py-3">
          <div className="flex items-center justify-between gap-6">
            <ToggleGroup
              type="single"
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              spacing={0}
              className="gap-1"
            >
              {categories.map((category) => (
                <ToggleGroupItem
                  key={category}
                  value={category}
                  className="rounded-lg border-0 bg-transparent px-4 py-2 text-sm text-[#757575] hover:bg-transparent hover:text-[#757575] data-[state=on]:bg-[#d9d7d2] data-[state=on]:font-medium data-[state=on]:text-[#43403b] data-[state=on]:hover:bg-[#d9d7d2]"
                >
                  {category}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

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
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              image={post.image}
              category={post.category}
              title={post.title}
              description={post.description}
              author={post.author}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ArticleSection
