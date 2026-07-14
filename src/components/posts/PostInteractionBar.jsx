import { Copy, SmilePlus, Facebook, Linkedin } from "lucide-react"
import { toast } from "sonner"

function XIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)
}

export function PostInteractionBar({ likes, onLike, postUrl }) {
  const handleCopy = async () => {
    try {
      await copyToClipboard(postUrl)
      toast.success("Copied!", {
        description: "This article has been copied to your clipboard.",
      })
    } catch {
      toast.error("Failed to copy", {
        description: "Please try again.",
      })
    }
  }

  const openShare = (url) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const encodedUrl = encodeURIComponent(postUrl)

  return (
    <div className="mb-10 flex flex-col gap-3 rounded-3xl bg-[#ebe9e4] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:rounded-full">
      <button
        type="button"
        onClick={onLike}
        className="flex items-center gap-2 rounded-full border border-black bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-50"
      >
        <SmilePlus className="size-4" strokeWidth={2} />
        {likes}
      </button>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-full border border-black bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-50"
        >
          <Copy className="size-4" strokeWidth={2} />
          Copy
        </button>

        <button
          type="button"
          aria-label="Share on Facebook"
          onClick={() =>
            openShare(`https://www.facebook.com/share.php?u=${encodedUrl}`)
          }
          className="flex size-10 items-center justify-center rounded-full border border-black bg-white text-black transition-colors hover:bg-gray-50"
        >
          <Facebook className="size-4" strokeWidth={2} />
        </button>

        <button
          type="button"
          aria-label="Share on LinkedIn"
          onClick={() =>
            openShare(
              `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
            )
          }
          className="flex size-10 items-center justify-center rounded-full border border-black bg-white text-black transition-colors hover:bg-gray-50"
        >
          <Linkedin className="size-4" strokeWidth={2} />
        </button>

        <button
          type="button"
          aria-label="Share on X"
          onClick={() =>
            openShare(`https://www.twitter.com/share?&url=${encodedUrl}`)
          }
          className="flex size-10 items-center justify-center rounded-full border border-black bg-white text-black transition-colors hover:bg-gray-50"
        >
          <XIcon className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
