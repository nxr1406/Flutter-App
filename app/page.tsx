import apps from "@/data/apps.json";
import AppGrid from "./components/AppGrid";
import { App } from "./types";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#a855f7]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff3d8a]/10 border border-[#ff3d8a]/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3d8a] animate-pulse" />
            <span className="text-xs text-[#ff3d8a] font-medium font-mono tracking-wider uppercase">
              Updated Daily
            </span>
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Premium APKs,
            <br />
            <span className="gradient-text">Always Free.</span>
          </h1>

          <p className="text-[#666] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Discover the latest MOD APKs with premium features unlocked. Safe, tested, and delivered straight to your device via Telegram.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            {[
              { label: "MOD Apps", value: `${(apps as App[]).length}+` },
              { label: "Downloads", value: "50K+" },
              { label: "Daily Updates", value: "24/7" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl sm:text-3xl font-bold gradient-text mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-[#444] font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Latest <span className="gradient-text">MOD APKs</span>
            </h2>
            <p className="text-[#444] text-sm mt-1">
              Browse our collection of premium modded applications
            </p>
          </div>
        </div>

        <AppGrid apps={apps as App[]} />
      </section>
    </>
  );
}
