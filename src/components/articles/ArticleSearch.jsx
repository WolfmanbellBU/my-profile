import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { fetchPosts } from "@/services/postService"

export function ArticleSearch({ inputClassName = "" }) {
  const [keyword, setKeyword] = useState("")
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const trimmed = keyword.trim()

    if (!trimmed) {
      setResults([])
      setIsOpen(false)
      return
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearching(true)
        const data = await fetchPosts({
          keyword: trimmed,
          page: 1,
          limit: 6,
        })
        setResults(data.posts)
        setIsOpen(true)
      } catch (err) {
        console.error(err)
        setResults([])
        setIsOpen(true)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [keyword])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = () => {
    setKeyword("")
    setResults([])
    setIsOpen(false)
  }

  const showDropdown = isOpen && keyword.trim()

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        type="text"
        placeholder="Search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        onFocus={() => {
          if (keyword.trim()) setIsOpen(true)
        }}
        className={`border-0 bg-white pr-10 shadow-none focus-visible:ring-0 ${inputClassName}`}
      />
      <Search
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#757575]"
        strokeWidth={2}
      />

      {showDropdown && (
        <div className="absolute top-full right-0 z-50 mt-2 w-full min-w-[280px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
          {isSearching ? (
            <p className="px-4 py-3 text-sm text-[#757575]">Loading...</p>
          ) : results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-[#757575]">No results found</p>
          ) : (
            <ul className="py-1">
              {results.map((post) => (
                <li key={post.id}>
                  <Link
                    to={`/post/${post.id}`}
                    onClick={handleSelect}
                    className="block px-4 py-3 text-sm text-[#43403b] no-underline transition-colors hover:bg-[#f5f4f0]"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
