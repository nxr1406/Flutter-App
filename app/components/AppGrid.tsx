"use client";

import { useState, useMemo } from "react";
import AppCard from "./AppCard";
import { App } from "../types";

const ALL = "All";

export default function AppGrid({ apps }: { apps: App[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(apps.map((a) => a.category))).sort();
    return [ALL, ...cats];
  }, [apps]);

  const filtered = useMemo(() => {
    return apps.filter((app) => {
      const matchSearch =
        search === "" ||
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.developer.toLowerCase().includes(search.toLowerCase()) ||
        app.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === ALL || app.category === category;
      return matchSearch && matchCat;
    });
  }, [apps, search, category]);

  return (
    <section id="apps">
      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search apps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#12121f] border border-[#1e1e30] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#ff3d8a]/50 focus:ring-1 focus:ring-[#ff3d8a]/20 transition-all"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 category-badge ${
                category === cat
                  ? "bg-gradient-to-r from-[#ff3d8a] to-[#a855f7] border-transparent text-white shadow-lg shadow-[#ff3d8a]/20"
                  : "bg-[#12121f] border-[#1e1e30] text-[#666] hover:border-[#ff3d8a]/40 hover:text-[#ccc]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs text-[#444] font-mono">
          {filtered.length} app{filtered.length !== 1 ? "s" : ""} found
        </p>
        {(search || category !== ALL) && (
          <button
            onClick={() => { setSearch(""); setCategory(ALL); }}
            className="text-xs text-[#ff3d8a] hover:text-[#ff6aaa] transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-[#444] text-sm">No apps found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((app, i) => (
            <div key={app.slug} className="animate-in" style={{ animationDelay: `${i * 50}ms` }}>
              <AppCard app={app} index={i} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
