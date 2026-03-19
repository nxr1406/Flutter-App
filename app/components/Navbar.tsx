"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Backdrop blur bar */}
      <div className="absolute inset-0 bg-[#080810]/80 backdrop-blur-xl border-b border-[#1e1e30]" />

      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff3d8a] to-[#a855f7] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L7 4L11 8L7 12L3 8Z" fill="white" fillOpacity="0.9" />
                <path d="M7 4L11 8L13 6L9 2L7 4Z" fill="white" fillOpacity="0.6" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#ff3d8a] to-[#a855f7] blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
          </div>
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="gradient-text">NXR</span>
            <span className="text-white">MOD</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-[#888] hover:text-white transition-colors duration-200"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Home
          </Link>
          <Link
            href="/#apps"
            className="text-sm text-[#888] hover:text-white transition-colors duration-200"
          >
            Apps
          </Link>
          <a
            href="https://t.me/nxrmod"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0088cc]/10 border border-[#0088cc]/30 text-[#0088cc] text-sm hover:bg-[#0088cc]/20 transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.025 9.54c-.148.661-.537.822-1.088.51l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.215-3.053 5.565-5.028c.242-.215-.053-.334-.373-.12L6.04 14.385l-2.94-.918c-.64-.2-.652-.64.133-.948l11.498-4.432c.532-.194 1.002.13.831.16z"/>
            </svg>
            Telegram
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1e1e30] bg-[#0e0e1a]">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link href="/" className="text-sm text-[#888] hover:text-white py-2" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/#apps" className="text-sm text-[#888] hover:text-white py-2" onClick={() => setMenuOpen(false)}>Apps</Link>
            <a
              href="https://t.me/nxrmod"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#0088cc] text-sm py-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.025 9.54c-.148.661-.537.822-1.088.51l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.215-3.053 5.565-5.028c.242-.215-.053-.334-.373-.12L6.04 14.385l-2.94-.918c-.64-.2-.652-.64.133-.948l11.498-4.432c.532-.194 1.002.13.831.16z"/>
              </svg>
              Join Telegram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
