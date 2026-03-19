import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "NXRMOD — Premium MOD APKs",
    template: "%s | NXRMOD",
  },
  description:
    "Download the latest MOD APKs with premium features unlocked. NXRMOD delivers safe, tested, and up-to-date modified Android apps.",
  keywords: ["MOD APK", "premium apps", "modded apps", "free APK", "NXRMOD"],
  openGraph: {
    siteName: "NXRMOD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="noise min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
