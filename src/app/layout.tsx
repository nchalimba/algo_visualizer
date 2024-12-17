"use client";
import Link from "next/link";
import { Press_Start_2P, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { useState } from "react";
import { FaBars, FaSitemap, FaRoute, FaSignal } from "react-icons/fa";
import { FaHouse, FaXmark } from "react-icons/fa6";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sidebar menu configuration
  const menuItems = [
    { name: "Home", href: "/", icon: FaHouse },
    { name: "Sorting", href: "/sorting", icon: FaSignal }, // Updated to reflect modern sliders
    { name: "Pathfinding", href: "/pathfinding", icon: FaRoute }, // More fitting for pathfinding (map-like)
    { name: "Tree Traversal", href: "/tree-traversal", icon: FaSitemap }, // Tree traversal stays, still appropriate
  ];

  return (
    <html lang="en" className={sourceCodePro.className}>
      <body className="bg-retroDark-100 text-retroText-primary font-retro">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside
            className={`fixed top-0 left-0 h-full bg-retroDark-200 transition-all duration-300 ease-in-out z-20
              ${isSidebarOpen ? "w-64" : "w-16"}
              md:relative md:w-64`}
          >
            {/* Sidebar Header */}

            <div className="p-4 flex items-center justify-end md:hidden">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-retroText-accent focus:outline-none"
              >
                {isSidebarOpen && <FaXmark className="text-2xl" />}
              </button>
            </div>

            {/* Sidebar Content */}
            <nav className="mt-6 space-y-4 px-4">
              {menuItems.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center gap-4 text-retroText-light hover:text-retroText-accent ${
                    isSidebarOpen ? "" : "justify-center md:justify-start"
                  }`}
                >
                  <Icon className="text-xl" />

                  <span className={`${isSidebarOpen ? "" : "hidden md:block"}`}>
                    {name}
                  </span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 transition-all ml-12 md:ml-0 duration-300 ease-in-out">
            {/* Hamburger Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="absolute top-4 left-4 z-30 md:hidden text-retroText-accent"
            >
              <FaBars className="text-2xl" />
            </button>
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
