import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SectionSidebarProps {
  sections: { id: string; label: string }[]
}

export function SectionSidebar({ sections }: SectionSidebarProps) {
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const root = document.querySelector(".app-scroll") as HTMLElement

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        root, // THIS IS THE FIX
        threshold: 0.3,
        rootMargin: "-30% 0px -40% 0px",
      }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])



  useEffect(() => {
    console.log(active)
  }, [active])


  return (
    <aside className="hidden md:flex w-64 flex-shrink-0 flex-col border-r bg-card p-4 space-y-2">
      <h2 className="text-lg font-semibold mb-2">On this page</h2>

      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={cn(
            "px-3 py-2 rounded-lg text-md font-medium transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            active === s.id && "bg-primary text-primary-foreground"
          )}
        >
          {s.label}
        </a>
      ))}
    </aside>
  )
}
