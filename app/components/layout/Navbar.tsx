"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Especialidades", href: "#pulido" },
  { label: "Trabajos", href: "#trabajos" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Navegación principal">
        <div className="navbar-inner">
          <Link href="#inicio" className="navbar-logo" aria-label="INSAURRALDE FLOORING - Inicio">
            <Image src="/logo.png" width={56} height={56} alt="Logo" />
            <div>
              <div className="navbar-brand">Insaurralde</div>
              <div className="navbar-tagline">Restauración de pisos</div>
            </div>
          </Link>

          <div className="navbar-links">
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href} className="navbar-link">
                {item.label}
              </Link>
            ))}
          </div>

          <Link href="#contacto" className="navbar-cta">
            Presupuesto →
          </Link>

          <button
            className={`navbar-hamburger${mobileOpen ? " open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile-menu${mobileOpen ? " open" : ""}`} aria-hidden={!mobileOpen}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="navbar-mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link href="#contacto" className="navbar-cta" onClick={() => setMobileOpen(false)}>
          Presupuesto →
        </Link>
      </div>
    </>
  );
}