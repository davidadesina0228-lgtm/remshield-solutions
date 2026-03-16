"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-navy/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/assets/remshield-logo.png"
            alt="RemShield"
            width={140}
            height={48}
            className="h-10 w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = !link.href.startsWith("#") && pathname === link.href;
            return (
              <li key={link.label}>
                {link.href.startsWith("#") ? (
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-silver hover:text-electricBlue transition-colors duration-200 text-sm font-medium tracking-wide"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`transition-colors duration-200 text-sm font-medium tracking-wide ${
                      isActive ? "text-teal" : "text-silver hover:text-electricBlue"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="block h-0.5 mt-0.5 rounded-full bg-teal" />
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, #00AAFF 0%, #00D4C8 100%)",
              boxShadow: "0 2px 12px rgba(0,170,255,0.25)",
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-silver hover:text-electricBlue transition-colors duration-200 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon
            icon={menuOpen ? faXmark : faBars}
            className="w-5 h-5"
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-navy/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = !link.href.startsWith("#") && pathname === link.href;
                return (
                <div key={link.label}>
                  {link.href.startsWith("#") ? (
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left text-silver hover:text-electricBlue transition-colors duration-200 text-base font-medium py-2"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block transition-colors duration-200 text-base font-medium py-2 ${
                        isActive ? "text-teal" : "text-silver hover:text-electricBlue"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
                );
              })}
              <a
                href="/contact"
                className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #00AAFF 0%, #00D4C8 100%)",
                  boxShadow: "0 2px 12px rgba(0,170,255,0.25)",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
