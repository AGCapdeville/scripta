import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

export const ThreeLineMenu = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const onClick = (e: MouseEvent) => {
            if (!menuRef.current) return;
            if (
                !menuRef.current.contains(e.target as Node) &&
                !btnRef.current?.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("click", onClick);
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("click", onClick);
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <div className="relative inline-block text-left">
            {/* Button */}
            <button
                ref={btnRef}
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
                {/* Icon: 3 lines -> X */}
                <span className="relative block h-4 w-6">
                    <span
                        className={`absolute inset-0 flex flex-col justify-between transition-all duration-300`}
                    >
                        {/* top */}
                        <span
                            className={`h-0.5 w-full bg-white transition-all duration-300
                                ${open ? "translate-y-1.5 rotate-45" : ""}`}
                        />
                        {/* middle */}
                        <span
                            className={`h-0.5 w-full bg-white transition-opacity duration-300
                                ${open ? "opacity-0" : "opacity-100"}`}
                        />
                        {/* bottom */}
                        <span
                            className={`h-0.5 w-full bg-white transition-all duration-300
                                ${open ? "-translate-y-2 -rotate-45" : ""}`}
                        />
                    </span>
                </span>

            </button>

            {/* Dropdown */}
            <div
                ref={menuRef}
                id="mobile-menu"
                className={`
                    absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-white/10 bg-[#1f2937] shadow-lg
                    transition-all duration-200 origin-top-right z-10
                    ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}
                    `}
                    role="menu"
                    aria-hidden={!open}
                >
                <nav className="py-1">
                    <Link 
                        to="/scripta/" 
                        className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10"
                        onClick={() => setOpen(false)}>
                        Games
                    </Link>
                </nav>
                <nav className="py-1">
                    <Link 
                        to="/scripta/record"
                        className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10"
                        onClick={() => setOpen(false)}>
                        Record
                    </Link>
                </nav>
                <nav className="py-1">
                    <Link
                        to="/scripta/about"
                        className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10"
                        onClick={() => setOpen(false)}>
                        About
                    </Link>
                </nav>
                <nav className="py-1">
                    <Link
                        to="/scripta/settings"
                        className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10"
                        onClick={() => setOpen(false)}>
                        Settings
                    </Link>
                </nav>
            </div>
        </div>
    );
}
