"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "AI Systems", href: "#services" },
    { label: "Automation Infrastructure", href: "#services" },
    { label: "Custom Software", href: "#services" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "How We Work", href: "#how-we-work" },
    { label: "Why RemShield", href: "#why" },
    { label: "FAQ", href: "#faq" },
    { label: "Blog", href: "/blog" },
  ],
  Blog: [
    { label: "AI Trends", href: "/blog" },
    { label: "Automation Guides", href: "/blog" },
    { label: "SaaS Insights", href: "/blog" },
    { label: "Case Studies", href: "/blog" },
  ],
};

export default function Footer() {
  const handleAnchorClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/10 pt-16 pb-8">
      {/* Top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,170,255,0.3), rgba(0,212,200,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4 group w-fit">
              <Image
                src="/assets/remshield-logo.png"
                alt="RemShield"
                width={120}
                height={42}
                className="h-10 w-auto object-contain group-hover:opacity-85 transition-opacity duration-200"
              />
            </Link>
            <p className="text-silver/60 text-sm leading-relaxed max-w-xs mb-6">
              Building intelligent AI systems for the future of business.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <a
                href="/contact"
                className="flex items-center gap-2 text-teal hover:text-teal/80 transition-colors duration-200 text-sm font-medium"
              >
                → Apply to Work With Us
              </a>
              <a
                href="mailto:contact@remshield.solutions"
                className="flex items-center gap-2 text-silver/60 hover:text-teal transition-colors duration-200 text-sm group"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="w-4 h-4 group-hover:text-teal"
                />
                contact@remshield.solutions
              </a>
              <a
                href="https://wa.me/message/GHYTIJUBDEY3H1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-silver/60 hover:text-teal transition-colors duration-200 text-sm group"
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="w-4 h-4 group-hover:text-teal"
                />
                Chat on WhatsApp
              </a>
              <a
                href="https://www.linkedin.com/in/david-adesina-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-silver/60 hover:text-teal transition-colors duration-200 text-sm group"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="w-4 h-4 group-hover:text-teal"
                />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm tracking-wide mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <button
                        onClick={() => handleAnchorClick(link.href)}
                        className="text-silver/60 hover:text-teal transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-silver/60 hover:text-teal transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-silver/55 text-sm">
            © 2026 RemShield. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="text-silver/55 hover:text-silver/80 transition-colors duration-200 text-xs"
            >
              Blog
            </Link>
            <Link
              href="/privacy"
              className="text-silver/55 hover:text-silver/80 transition-colors duration-200 text-xs"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-silver/55 hover:text-silver/80 transition-colors duration-200 text-xs"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
