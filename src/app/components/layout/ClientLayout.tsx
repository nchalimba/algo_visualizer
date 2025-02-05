"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaSitemap, FaRoute, FaSignal } from "react-icons/fa";
import { FaGear, FaHouse, FaMessage, FaRobot, FaXmark } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastContainer from "../common/ToastContainer";
import { getHealthStatus } from "@/api/health";
import clsx from "clsx";

const menuItems = [
  { name: "Home", href: "/", icon: FaHouse },
  { name: "Sorting", href: "/sorting", icon: FaSignal },
  { name: "Pathfinding", href: "/pathfinding", icon: FaRoute },
  { name: "Tree Traversal", href: "/tree-traversal", icon: FaSitemap },
  { name: "AI Assistant", href: "/chat", icon: FaRobot },
  { name: "Settings", href: "/settings", icon: FaGear },
];

const queryClient = new QueryClient();

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        await getHealthStatus(); // Call the health status API once
      } catch (error) {
        console.error("Failed to fetch health status:", error);
      }
    };
    fetchHealthStatus();
  }, []); // Empty dependency array ensures this runs once on mount

  const sidebarClasses = clsx(
    "fixed top-0 left-0 p-2 h-full transition-all duration-300 ease-in-out z-20 rounded-lg md:relative md:w-64",
    {
      "w-64": isSidebarOpen,
      "w-16": !isSidebarOpen,
    }
  );
  const sidebarContainerClasses = clsx(
    "p-1 relative bg-retroDark-300 h-full rounded-lg transition-all duration-300 ease-in-out z-20 md:w-64",
    {
      "w-64": isSidebarOpen,
      "w-16": !isSidebarOpen,
    }
  );

  const sidebarLinkClasses = (href: string) =>
    clsx(
      "flex items-center gap-4 text-retroText-light hover:text-retroDark-accent transition-colors duration-300",
      {
        "justify-center md:justify-start": !isSidebarOpen,
        "text-retroDark-accent font-bold": pathname === href, //TODO: this color is not working
      }
    );

  const hamburgerClasses = clsx(
    "absolute top-4  z-30 md:hidden text-retroDark-accent hover:text-retroDark-accent-hover transition-colors duration-300",
    {
      "left-4": isSidebarOpen,
      "left-1/2 transform -translate-x-1/2": !isSidebarOpen,
    }
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <div className="flex h-screen relative">
        {/* Sidebar */}
        <aside className={sidebarClasses}>
          <div className={sidebarContainerClasses}>
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
                  className={sidebarLinkClasses(href)}
                >
                  <Icon className="text-xl" aria-hidden="true" />
                  <span className={`${isSidebarOpen ? "" : "hidden md:block"}`}>
                    {name}
                  </span>
                </Link>
              ))}
            </nav>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={hamburgerClasses}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <FaBars className="text-2xl" aria-hidden="true" />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 transition-all ml-14 md:ml-0 duration-300 ease-in-out overflow-y-auto">
          <main className="pl-4 md:p-6">{children}</main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
