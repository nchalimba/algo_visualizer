"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaSitemap, FaRoute, FaSignal } from "react-icons/fa";
import { FaHouse, FaXmark } from "react-icons/fa6";
import ChatBot from "../chat/ChatBot";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Home", href: "/", icon: FaHouse },
  { name: "Sorting", href: "/sorting", icon: FaSignal },
  { name: "Pathfinding", href: "/pathfinding", icon: FaRoute },
  { name: "Tree Traversal", href: "/tree-traversal", icon: FaSitemap },
];

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <>
      {/* <ChatBot /> */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full bg-retroDark-300 transition-all duration-300 ease-in-out z-20
            ${isSidebarOpen ? "w-64" : "w-16"}
            md:relative md:w-64`}
        >
          {/* Sidebar Header */}
          <div className="p-4 flex items-center justify-end md:hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-retroDark-accent focus:outline-none hover:text-retroDark-accent-hover transition-colors duration-300"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen && (
                <FaXmark className="text-2xl" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Sidebar Content */}
          <nav className="mt-6 space-y-4 px-4" aria-label="Main navigation">
            {menuItems.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-4 text-retroText-light hover:text-retroDark-accent transition-colors duration-300 ${
                  isSidebarOpen ? "" : "justify-center md:justify-start"
                } ${
                  pathname === href
                    ? "text-retroDark-accent-active font-bold"
                    : "text-retroText-light"
                }`}
              >
                <Icon className="text-xl" aria-hidden="true" />
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
            className="absolute top-4 left-4 z-30 md:hidden text-retroDark-accent hover:text-retroDark-accent-hover transition-colors duration-300"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <FaBars className="text-2xl" aria-hidden="true" />
          </button>
          <main className="pl-4 md:p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
