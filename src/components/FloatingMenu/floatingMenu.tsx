import { useState } from "react";
import { Eye, Menu, Plus, X } from "lucide-react";

function FloatingMenu({ setShowPreview, setMenuOpen }:any) {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-[300] ">
            {/* Child Buttons (with animation) */}
            <div
                className={`flex flex-col items-center gap-3 mb-3 transition-all duration-300 ease-in-out ${
                    open
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-6 scale-0 pointer-events-none"
                }`}
            >
                {/* Preview Button */}
                <button
                    onClick={() => {
                        setShowPreview(true);
                        setOpen(false);
                    }}
                    className="w-12 h-12 rounded-full bg-neutral-800 text-white flex items-center justify-center 
                               shadow-lg hover:bg-neutral-700 transform transition-all duration-300"
                >
                    <Eye size={20} />
                </button>

                {/* Menu Button */}
                <button
                    onClick={() => {
                        //@ts-ignore
                        setMenuOpen((prev) => !prev);
                        setOpen(false);
                    }}
                    className="w-12 h-12 rounded-full bg-neutral-800 text-white flex items-center justify-center 
                               shadow-lg hover:bg-neutral-700 transform transition-all duration-300"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Main Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center 
                           shadow-xl hover:bg-blue-700 transition-transform duration-300 transform active:scale-95"
            >
                {open ? <X size={24} /> : <Plus size={24} />}
            </button>
        </div>
    );
}

export default FloatingMenu;
