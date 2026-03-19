import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import apps from "@/data/apps.json";
import { App } from "@/app/types";

// SSG: pre-generate all app pages
export async function generateStaticParams() {
  return (apps as App[]).map((app) => ({ slug: app.slug }));
}

// Dynamic SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const app = (apps as App[]).find((a) => a.slug === params.slug);
  if (!app) return { title: "App Not Found" };

  return {
    title: `${app.name} MOD APK v${app.version} — Download Free`,
    description: `Download ${app.name} MOD APK v${app.version}. ${app.features.slice(0, 3).join(", ")}. ${app.size} | ${app.developer}`,
    keywords: [
      `${app.name} MOD APK`,
      `${app.name} premium`,
      `${app.name} hack`,
      `${app.name} free`,
      app.category,
      "MOD APK",
    ],
    openGraph: {
      title: `${app.name} MOD APK v${app.version}`,
      description: app.description,
      type: "article",
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Education: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Music: "text-green-400 bg-green-500/10 border-green-500/20",
  Video: "text-red-400 bg-red-500/10 border-red-500/20",
  Design: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Photography: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Entertainment: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  Tools: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
};

export default function AppPage({ params }: { params: { slug: string } }) {
  const app = (apps as App[]).find((a) => a.slug === params.slug);
  if (!app) notFound();

  const catColor = CATEGORY_COLORS[app.category] || "text-[#888] bg-[#1e1e30] border-[#2a2a3d]";
  const relatedApps = (apps as App[])
    .filter((a) => a.category === app.category && a.slug !== app.slug)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#444] mb-8 font-mono">
        <Link href="/" className="hover:text-[#ff3d8a] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/#apps" className="hover:text-[#ff3d8a] transition-colors">Apps</Link>
        <span>/</span>
        <span className="text-[#666]">{app.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main content */}
        <div className="lg:col-span-2">
          {/* App header */}
          <div className="gradient-border rounded-3xl bg-[#0e0e1a] p-6 sm:p-8 mb-6">
            <div className="flex items-start gap-5 mb-6">
              {/* Icon */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-[#1a1a2e] border border-[#2a2a3d] flex-shrink-0">
                <Image
                  src={app.icon}
                  alt={`${app.name} icon`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-3xl font-bold gradient-text" style="font-family:var(--font-display);background:linear-gradient(135deg,#12121f,#1a1a2e)">${app.name[0]}</div>`;
                    }
                  }}
                />
              </div>

              <div className="flex-1">
                <h1
                  className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {app.name}
                </h1>
                <p className="text-[#555] text-sm mb-3">{app.developer}</p>
                <div className="flex flex-wrap gap-2">
                  <span className={`category-badge px-2.5 py-1 rounded-lg border ${catColor}`}>
                    {app.category}
                  </span>
                  <span className="category-badge px-2.5 py-1 rounded-lg border bg-[#1e1e30] text-[#555] border-[#2a2a3d]">
                    v{app.version}
                  </span>
                  <span className="category-badge px-2.5 py-1 rounded-lg border bg-[#1e1e30] text-[#555] border-[#2a2a3d]">
                    {app.size}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: "⭐", label: "Rating", value: `${app.rating}/5` },
                { icon: "📥", label: "Downloads", value: app.downloads },
                { icon: "📦", label: "Size", value: app.size },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-3 rounded-2xl bg-[#12121f] border border-[#1e1e30]"
                >
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div
                    className="text-sm font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-[#444] font-mono uppercase tracking-wide mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={app.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn flex-1 py-3.5 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2.5"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v9M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download MOD APK
              </a>
              <a
                href="https://t.me/nxrmod"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-5 py-3.5 rounded-2xl bg-[#0088cc]/10 border border-[#0088cc]/30 text-[#0088cc] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#0088cc]/20 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.025 9.54c-.148.661-.537.822-1.088.51l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.215-3.053 5.565-5.028c.242-.215-.053-.334-.373-.12L6.04 14.385l-2.94-.918c-.64-.2-.652-.64.133-.948l11.498-4.432c.532-.194 1.002.13.831.16z"/>
                </svg>
                Join Channel
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-3xl bg-[#0e0e1a] border border-[#1e1e30] p-6 sm:p-8 mb-6">
            <h2
              className="text-lg font-bold text-white mb-4 flex items-center gap-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[#ff3d8a] to-[#a855f7]" />
              About This App
            </h2>
            <p className="text-[#888] text-sm leading-relaxed">{app.description}</p>
          </div>

          {/* MOD Features */}
          <div className="rounded-3xl bg-[#0e0e1a] border border-[#1e1e30] p-6 sm:p-8">
            <h2
              className="text-lg font-bold text-white mb-5 flex items-center gap-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[#ff3d8a] to-[#a855f7]" />
              MOD Features
            </h2>
            <ul className="space-y-3">
              {app.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 animate-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ff3d8a]/20 to-[#a855f7]/20 border border-[#ff3d8a]/30 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#ff3d8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[#bbb] text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-1 space-y-5">
          {/* App info card */}
          <div className="rounded-3xl bg-[#0e0e1a] border border-[#1e1e30] p-5">
            <h3
              className="text-sm font-bold text-white mb-4 flex items-center gap-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#ff3d8a] to-[#a855f7]" />
              App Information
            </h3>
            <dl className="space-y-3">
              {[
                { label: "Version", value: `v${app.version}` },
                { label: "Developer", value: app.developer },
                { label: "Category", value: app.category },
                { label: "File Size", value: app.size },
                { label: "Downloads", value: app.downloads },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <dt className="text-[#444] font-mono text-xs uppercase tracking-wide">{label}</dt>
                  <dd className="text-[#bbb] font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Warning card */}
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/10 p-4">
            <div className="flex items-start gap-3">
              <span className="text-lg mt-0.5">⚠️</span>
              <div>
                <p className="text-yellow-500/80 text-xs font-semibold mb-1">Installation Note</p>
                <p className="text-[#555] text-xs leading-relaxed">
                  Enable "Install from unknown sources" in your device settings before installing MOD APKs.
                </p>
              </div>
            </div>
          </div>

          {/* Related apps */}
          {relatedApps.length > 0 && (
            <div className="rounded-3xl bg-[#0e0e1a] border border-[#1e1e30] p-5">
              <h3
                className="text-sm font-bold text-white mb-4 flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#ff3d8a] to-[#a855f7]" />
                Related Apps
              </h3>
              <div className="space-y-3">
                {relatedApps.map((relApp) => (
                  <Link
                    key={relApp.slug}
                    href={`/apps/${relApp.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#1a1a2e] border border-[#2a2a3d] flex-shrink-0">
                      <Image
                        src={relApp.icon}
                        alt={relApp.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.style.display = "none";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#ccc] group-hover:text-white truncate transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                        {relApp.name}
                      </p>
                      <p className="text-xs text-[#444] font-mono">v{relApp.version}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#333] group-hover:text-[#ff3d8a] transition-colors flex-shrink-0">
                      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
