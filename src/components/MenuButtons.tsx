import { useEffect, useRef, useState } from "react";
import { Link, LinkProps } from 'react-router-dom';
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export const ThreeLineMenu = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

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

type LinkButtonProps = {
    to: LinkProps["to"];
    children: React.ReactNode;
    className?: string;
    clickFunction?: () => void;
};

export const LinkButton = ({ to, children, className, clickFunction}: LinkButtonProps) => {
    return (
        <Link 
            to={to} 
            className={className}
            onClick={clickFunction}
        >
            {children}
        </Link>
    );
}


export const HamburgerMenu = () => {
    const [open, setOpen] = useState(false);
    const { session } = useAuth();

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            setOpen(false);
        } catch (error) {
            console.error("Failed to sign out", error);
        }
    };

    const displayName =
        session?.user?.user_metadata?.display_name ??
        session?.user?.email; // fallback

    const signedIn = session?.user?.user_metadata?.display_name ? true : false;

    return (
        <div className="relative">
            {/* Hamburger Button */}
            <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-md hover:bg-slate-800 focus:outline-none"
                aria-label="Open menu"
            >
                {/* Simple Hamburger Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-foreground/70 hover:text-foreground transition"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Overlay (click to close) */}
            {open && (
                <div
                    // className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Slide-in Panel */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-64 bg-background shadow-xl transform transition-transform duration-300 ease-in-out
                ${open ? "translate-x-0" : "translate-x-full"} 
                border-l-1 border-border`}
            >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                        className="p-2 rounded-md hover:bg-background-800"
                    >
                        ✕
                    </button>
                </div>
                

                {/* Menu Content */}
                <nav className="w-full flex flex-col text-foreground/70 hover:text-foreground transition gap-4 ">
                    {session && (
                        <div className="mx-3 rounded-xl border border-border/50 bg-background/60 px-4 py-3 text-xs text-foreground/70 shadow-sm relative">
                            <div className="text-[0.65rem] uppercase tracking-[0.12em] text-foreground/50">Signed in</div>
                            <div className="mt-1 truncate text-sm font-medium text-foreground">{displayName}</div>
                            <div className="absolute top-7 right-3">
                                <LinkButton
                                    to="/scripta/"
                                    children="Sign Out"
                                    className="pl-4 px-3 text-sm text-rose-200 transition hover:bg-black hover:text-rose-300"
                                    clickFunction={handleSignOut}
                                />
                            </div>
                        </div>
                    )}
                    <LinkButton 
                        to="/scripta/"
                        // className="px-3 py-2 hover:text-violet-400 hover:bg-black"
                        className="pl-4 px-3 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-black text-foreground transition"
                        clickFunction={() => setOpen(false)}
                    >
                        Home
                    </LinkButton> 
                    <LinkButton
                        to="/scripta/modes"
                        children="Game Modes"
                        className="pl-4 px-3 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-black text-foreground transition"
                        clickFunction={() => setOpen(false)}
                    />
                    <LinkButton
                        to="/scripta/how-to-play"
                        children="How to Play"
                        className="pl-4 px-3 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-black text-foreground transition"
                        clickFunction={() => setOpen(false)}
                    />
                    {signedIn && (
                        <LinkButton
                            to="/scripta/statisics"
                            children="Statistics"
                            className="pl-4 px-3 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-black text-foreground transition"
                            clickFunction={() => setOpen(false)}
                        />
                    )}
                    <LinkButton
                        to="/scripta/settings"
                        children="Settings"
                        className="pl-4 px-3 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-black text-foreground transition"
                        clickFunction={() => setOpen(false)}
                    />
                    <LinkButton
                        to="/scripta/about"
                        children="About"
                        className="pl-4 px-3 py-1 text-sm text-foreground/70 hover:text-foreground hover:bg-black text-foreground transition"
                        clickFunction={() => setOpen(false)}
                    />

                    {!signedIn && (
                        <div>
                            <LinkButton
                                to={{ pathname: "/scripta/portal", search: "?mode=signin" }}
                                children="Sign In"
                                className="pl-4 px-3 text-sm text-primary hover:text-foreground hover:bg-black text-foreground transition"
                                clickFunction={() => setOpen(false)}
                            /> /
                            <LinkButton
                                to={{ pathname: "/scripta/portal", search: "?mode=signup" }}
                                children="Sign Up"
                                className="pl-4 px-3 text-sm text-primary hover:text-foreground hover:bg-black text-foreground transition"
                                clickFunction={() => setOpen(false)}
                            />
                        </div>
                    )}

                </nav>
            </div>
        </div>
    );
}
