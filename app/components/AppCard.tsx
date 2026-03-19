import Link from "next/link";
import Image from "next/image";
import { App } from "../types";

const CATEGORY_COLORS: Record<string, string> = {
  Education: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Music: "bg-green-500/10 text-green-400 border-green-500/20",
  Video: "bg-red-500/10 text-red-400 border-red-500/20",
  Design: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Photography: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Entertainment: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Tools: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z"
            fill={i <= full ? "#fbbf24" : half && i === full + 1 ? "url(#half)" : "#2a2a3d"}
            stroke="none"
          />
          <defs>
            <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#2a2a3d" />
            </linearGradient>
          </defs>
        </svg>
      ))}
      <span className="text-[10px] text-[#666] ml-1 font-mono">{rating}</span>
    </div>
  );
}

export default function AppCard({ app, index = 0 }: { app: App; index?: number }) {
  const catColor = CATEGORY_COLORS[app.category] || "bg-[#1e1e30] text-[#888] border-[#2a2a3d]";

  return (
    <Link href={`/apps/${app.slug}`} className="block">
      <article
        className="card-glow gradient-border rounded-2xl bg-[#12121f] overflow-hidden cursor-pointer"
        style={{
          animationDelay: `${index * 60}ms`,
        }}
      >
        {/* Top section */}
        <div className="p-5">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#1a1a2e] border border-[#2a2a3d]">
                <Image
                  src={app.icon}
                  alt={`${app.name} icon`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-2xl font-bold gradient-text" style="font-family:var(--font-display)">${app.name[0]}</div>`;
                    }
                  }}
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3
                className="text-white font-semibold text-base leading-tight truncate mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {app.name}
              </h3>
              <p className="text-[#555] text-xs mb-2 truncate">{app.developer}</p>
              <StarRating rating={app.rating} />
            </div>
          </div>

          {/* Category + Version row */}
          <div className="flex items-center gap-2 mt-4">
            <span className={`category-badge px-2 py-0.5 rounded-md border ${catColor}`}>
              {app.category}
            </span>
            <span className="category-badge px-2 py-0.5 rounded-md bg-[#1e1e30] text-[#555] border border-[#2a2a3d]">
              v{app.version}
            </span>
            <span className="ml-auto text-[10px] text-[#444] font-mono">{app.downloads}</span>
          </div>
        </div>

        {/* Bottom download bar */}
        <div className="px-5 pb-5">
          <div className="shimmer-btn w-full py-2.5 rounded-xl text-white text-sm font-semibold text-center flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v9M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download MOD
          </div>
        </div>
      </article>
    </Link>
  );
}
