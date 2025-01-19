import { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/layout/ClientLayout";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Retro Algorithm Visualizer",
  description:
    "Interactive visualizations for sorting, pathfinding, and tree traversal algorithms in a retro arcade style",
  keywords: [
    "algorithms",
    "visualization",
    "sorting",
    "pathfinding",
    "tree traversal",
    "retro",
    "arcade",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={oxanium.className}>
      <body className="bg-retroDark-100 text-retroText-light font-retro">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
