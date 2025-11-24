"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogOut, Settings, User, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore, selectIsAuthenticated, selectUser, selectUserDisplayName } from "@/stores/user-store";
import { useUIStore, selectMobileMenuOpen } from "@/stores/ui-store";

// Navigation links configuration
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/library", label: "Library" },
  { href: "/paths", label: "Paths" },
  { href: "/dashboard", label: "Dashboard" },
];

export interface HeaderProps {
  transparent?: boolean;
  className?: string;
}

export function Header({ transparent = false, className }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  // Store state
  const isAuthenticated = useUserStore(selectIsAuthenticated);
  const user = useUserStore(selectUser);
  const displayName = useUserStore(selectUserDisplayName);
  const logout = useUserStore((state) => state.logout);

  const mobileMenuOpen = useUIStore(selectMobileMenuOpen);
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  // Get user initials for avatar fallback
  const initials = React.useMemo(() => {
    if (!displayName || displayName === "Guest") return "?";
    return displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [displayName]);

  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    transparent && !scrolled
      ? "bg-transparent"
      : "bg-white shadow-sm border-b border-gray-200",
    className
  );

  return (
    <>
      <header className={headerClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.avif"
                alt="YoYoChampion"
                width={150}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors relative",
                      transparent && !scrolled
                        ? isActive
                          ? "text-white"
                          : "text-white/80 hover:text-white"
                        : isActive
                          ? "text-fun-blue"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="header-nav-indicator"
                        className={cn(
                          "absolute bottom-0 left-2 right-2 h-0.5 rounded-full",
                          transparent && !scrolled ? "bg-white" : "bg-xp"
                        )}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 outline-none">
                      <Avatar size="sm" variant="none" className="ring-2 ring-fun-blue/30">
                        <AvatarImage src={user.avatarUrl} alt={displayName} />
                        <AvatarFallback className="bg-xp text-white text-xs">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 hidden sm:block transition-colors",
                          transparent && !scrolled ? "text-white/80" : "text-gray-500"
                        )}
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200">
                    <DropdownMenuLabel className="text-gray-900">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">{displayName}</span>
                        <span className="text-xs text-gray-500 font-normal">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem asChild className="text-gray-700 focus:text-gray-900 focus:bg-gray-100 cursor-pointer">
                      <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-gray-700 focus:text-gray-900 focus:bg-gray-100 cursor-pointer">
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-gray-700 focus:text-gray-900 focus:bg-gray-100 cursor-pointer">
                      <Link href="/profile/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/login">
                    <Button
                      variant={transparent && !scrolled ? "ghost" : "ghost"}
                      size="sm"
                      className={cn(
                        transparent && !scrolled
                          ? "text-white hover:bg-white/10"
                          : "text-gray-700 hover:text-gray-900"
                      )}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      variant="brand"
                      size="sm"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className={cn(
                  "md:hidden p-2 rounded-lg transition-colors",
                  transparent && !scrolled
                    ? "text-white hover:bg-white/10"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <div className="bg-white border-b border-gray-200 shadow-lg">
              <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href ||
                    (link.href !== "/" && pathname?.startsWith(link.href));

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive
                          ? "bg-fun-blue/10 text-fun-blue"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {!isAuthenticated && (
                  <div className="pt-4 border-t border-gray-200 mt-4 space-y-2">
                    <Link href="/login" className="block">
                      <Button variant="outline" className="w-full justify-center">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup" className="block">
                      <Button variant="brand" className="w-full justify-center">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16" />
    </>
  );
}

export default Header;
