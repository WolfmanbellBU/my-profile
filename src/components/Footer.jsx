import { Linkedin, Github, Chrome } from "lucide-react"

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full bg-[#262626] text-white transition-opacity hover:opacity-80"
    >
      {children}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="w-full bg-[#f2f2f2] px-8 py-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-base text-[#404040]">Get in touch</span>

          <div className="flex items-center gap-2">
            <SocialIcon href="#" label="LinkedIn">
              <Linkedin size={14} strokeWidth={2.5} />
            </SocialIcon>
            <SocialIcon href="#" label="GitHub">
              <Github size={14} strokeWidth={2.5} />
            </SocialIcon>
            <SocialIcon href="#" label="Google">
              <Chrome size={14} strokeWidth={2.5} />
            </SocialIcon>
          </div>
        </div>

        <a
          href="#"
          className="text-base text-[#404040] underline underline-offset-2 hover:text-black transition-colors"
        >
          Home page
        </a>
      </div>
    </footer>
  )
}
