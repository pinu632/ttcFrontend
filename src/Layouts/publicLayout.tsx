import { Outlet } from "react-router-dom"
import { TechTalkNavbar } from "@/components/UIComponents/Navbar/Navbar"

export default function PublicLayout() {
    return (
        <div className="h-dvh flex flex-col">

            {/* Navbar height fixed */}
            <div className="h-16 shrink-0">
                <TechTalkNavbar />
            </div>

            {/* Remainder fills screen */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                <Outlet />
            </div>

        </div>
    )
}

