import { type PropsWithChildren } from "react"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbList,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Home, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AppLayout({
  children,
  breadcrumbs = [],
  sidebar
}: PropsWithChildren<{ 
  pageTitle?: string; 
  breadcrumbs?: { label: string; href?: string }[],
  sidebar?: React.ReactNode
}>) {
  return (
    <div className="flex h-full w-full bg-background text-foreground overflow-hidden">

      {/* LEFT SIDEBAR (dynamic sections) */}
      {sidebar}

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-y-auto">

        {/* HEADER */}
        <header className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>

            {/* Breadcrumbs */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {breadcrumbs.map((b, i) => (
                  <div key={i} className="flex items-center">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {b.href ? (
                        <BreadcrumbLink href={b.href}>{b.label}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{b.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

         
        </header>

        {/* PAGE CONTENT */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
