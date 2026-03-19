export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e30] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span
              className="text-xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="gradient-text">NXR</span>
              <span className="text-white">MOD</span>
            </span>
            <p className="text-xs text-[#444] max-w-xs text-center md:text-left">
              Premium MOD APKs — tested, safe, and always up-to-date.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-[#555]">
            <a href="https://t.me/nxrmod" target="_blank" rel="noopener noreferrer" className="hover:text-[#0088cc] transition-colors flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.025 9.54c-.148.661-.537.822-1.088.51l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.215-3.053 5.565-5.028c.242-.215-.053-.334-.373-.12L6.04 14.385l-2.94-.918c-.64-.2-.652-.64.133-.948l11.498-4.432c.532-.194 1.002.13.831.16z"/>
              </svg>
              Telegram Channel
            </a>
            <span>•</span>
            <span>DMCA</span>
            <span>•</span>
            <span>Privacy</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-[#0e0e1a] border border-[#1e1e30]">
          <p className="text-[10px] text-[#333] text-center leading-relaxed">
            ⚠️ DISCLAIMER: NXRMOD is for educational purposes only. All apps are property of their respective developers. We do not host any APK files — all downloads redirect to our Telegram channel. Use at your own risk.
          </p>
        </div>

        <p className="text-center text-[10px] text-[#2a2a3d] mt-6 font-mono">
          © {new Date().getFullYear()} NXRMOD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
