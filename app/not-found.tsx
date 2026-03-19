import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div
        className="text-8xl font-extrabold gradient-text mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        404
      </div>
      <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>
        App Not Found
      </h2>
      <p className="text-[#444] text-sm mb-8">
        The app you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/"
        className="shimmer-btn px-6 py-3 rounded-xl text-white font-semibold text-sm"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
