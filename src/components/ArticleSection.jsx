import { Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"

const categories = ["Highlight", "Cat", "Inspiration", "Ganeral"]

function ArticleSection() {
  return (
    <section className="w-full bg-white px-8 py-10">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold !text-black">Latest articles</h2>

        {/* Desktop */}
        <div className="hidden md:block rounded-2xl bg-[#ebe9e4] px-4 py-3">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    category === "Highlight"
                      ? "rounded-lg bg-[#d9d7d2] px-4 py-2 text-sm font-medium text-[#43403b]"
                      : "px-4 py-2 text-sm text-[#757575]"
                  }
                >
                  {category}
                </button>
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
              <span className="text-sm text-[#757575]">Category</span>
              <div className="relative flex h-11 items-center rounded-lg bg-white px-3">
                <span className="text-sm text-[#43403b]">Highlight</span>
                <ChevronDown
                  className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#757575]"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArticleSection
