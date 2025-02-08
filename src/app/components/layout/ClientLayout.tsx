"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSitemap, FaRoute, FaSignal } from "react-icons/fa";
import { FaGear, FaHouse, FaRobot } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastContainer from "../common/ToastContainer";
import { getHealthStatus } from "@/api/health";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { twMerge } from "tailwind-merge";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const sidebarClasses = twMerge(
    "fixed top-0 left-0 p-2 h-full transition-all duration-300 ease-in-out z-20 md:relative",
    isSidebarOpen ? "w-64" : "w-16"
  );

  const sidebarContainerClasses = twMerge(
    "p-1 relative bg-retroDark-300 h-full rounded-3xl transition-all duration-300 ease-in-out z-20",
    isSidebarOpen ? "w-64" : "w-16"
  );

  const sidebarLinkClasses = (href: string) =>
    twMerge(
      "flex items-center justify-start gap-4 text-retroText-light hover:text-retroDark-accent transition-colors duration-300",
      pathname === href && "text-retroDark-accent font-bold"
    );

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <div className="flex h-screen relative">
        {/* Sidebar */}
        <aside className={sidebarClasses}>
          <div className={sidebarContainerClasses}>
            {/* Sidebar Header */}
            <div
              className={twMerge(
                "text-retroDark-accent font-bold pt-4 pl-4 whitespace-nowrap overflow-hidden transition-colors duration-300 ease-in-out",
                !isSidebarOpen && "text-retroDark-200"
              )}
            >
              <p
                className={
                  isSidebarOpen
                    ? "transition-colors"
                    : "transition-colors text-retroDark-300"
                }
              >
                Algo Visualizer
              </p>
            </div>

            {/* Sidebar Content */}
            <nav className="mt-6 space-y-4 px-4" aria-label="Main navigation">
              {menuItems.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={sidebarLinkClasses(href)}
                >
                  <Icon
                    className="h-6 w-6 min-h-6 min-w-6"
                    aria-hidden="true"
                  />
                  <span
                    className={twMerge(
                      "whitespace-nowrap overflow-hidden transition-all duration-300",
                      isSidebarOpen && "visible"
                    )}
                  >
                    {name}
                  </span>
                </Link>
              ))}
            </nav>
            {/* Hamburger Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="absolute top-4 right-[18px] z-30 text-retroDark-accent hover:text-retroDark-accent-hover transition-all ease-in-out duration-300"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? (
                <TbLayoutSidebarLeftCollapseFilled
                  className="h-7 w-7 min-h-7 min-w-7"
                  aria-hidden="true"
                />
              ) : (
                <TbLayoutSidebarLeftExpand
                  className="h-7 w-7 min-h-7 min-w-7"
                  aria-hidden="true"
                />
              )}
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
