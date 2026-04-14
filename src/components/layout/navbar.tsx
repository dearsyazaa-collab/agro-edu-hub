"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  Menu,
  Leaf,
  BookOpen,
  Calculator,
  ListChecks,
  GraduationCap,
  BookA,
  X,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda", icon: Leaf },
  { href: "/katalog", label: "Katalog Materi", icon: BookOpen },
  { href: "/kalkulator", label: "Kalkulator", icon: Calculator },
  { href: "/checklist", label: "Checklist", icon: ListChecks },
  { href: "/quiz", label: "Kuis", icon: GraduationCap },
  { href: "/glosarium", label: "Glosarium", icon: BookA },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-emerald-200/50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-emerald shadow-md group-hover:shadow-lg transition-shadow">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-emerald-900 leading-tight">
              Agro-Edu Hub
            </p>
            <p className="text-[10px] font-medium text-emerald-600 leading-tight">
              Al-Fauzan
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-100 text-emerald-800 shadow-sm"
                    : "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="lg:hidden inline-flex items-center justify-center size-8 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white border-emerald-200/50 p-0">
            <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-emerald">
                    <Leaf className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-900">Agro-Edu Hub</p>
                    <p className="text-[10px] text-emerald-600">Al-Fauzan</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center size-8 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="flex-1 p-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-emerald-100 text-emerald-800 shadow-sm"
                          : "text-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Footer */}
              <div className="p-4 border-t border-emerald-100">
                <p className="text-xs text-emerald-500 text-center">
                  MA Pesantren Terpadu Al-Fauzan
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
