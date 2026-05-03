import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const linkClass = `
  font-medium tracking-wide transition-colors duration-200
  text-[var(--color-text-soft)] hover:text-[var(--color-accent)]
`;

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="px-4 py-6 mx-auto lg:py-2 md:px-24 lg:px-8"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="relative flex items-center justify-between lg:justify-center lg:space-x-16">

        {/* Links izquierda — desktop */}
        <ul className="items-center hidden space-x-8 lg:flex">
          <li><Link href="/" className={linkClass}>Inicio</Link></li>
          <li><Link href="/" className={linkClass}>Servicios</Link></li>
        </ul>

        {/* Logo */}
        <Link href="/" aria-label="Inicio" className="inline-flex items-center">
          <Image src="/logo.png" width={80} height={80} alt="Pulido de pisos" />
        </Link>

        {/* Links derecha — desktop */}
        <ul className="items-center hidden space-x-8 lg:flex">
          <li><Link href="/" className={linkClass}>Galería</Link></li>
          <li><Link href="/" className={linkClass}>Contactanos</Link></li>
        </ul>

        {/* Hamburguesa — mobile */}
        <div className="lg:hidden">
          <button
            aria-label="Abrir menú"
            className="p-2 -mr-1 rounded transition duration-200 hover:bg-[var(--color-surface)]"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-[var(--color-text-soft)]" viewBox="0 0 24 24">
              <path fill="currentColor" d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"/>
              <path fill="currentColor" d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"/>
              <path fill="currentColor" d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"/>
            </svg>
          </button>

          {/* Menú mobile */}
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-50">
              <div
                className="p-5 rounded shadow-lg border"
                style={{
                  background: 'var(--color-bg)',
                  borderColor: 'var(--color-border)',
                }}
              >
                {/* Header del menú mobile */}
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="inline-flex items-center">
                    <Image src="/logo.png" width={60} height={60} alt="Pulido de pisos" />
                  </Link>
                  <button
                    aria-label="Cerrar menú"
                    className="p-2 rounded transition duration-200 hover:bg-[var(--color-surface)]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 text-[var(--color-text-soft)]" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4
                        l6.3,6.3l-6.3,6.3c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3
                        l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4
                        L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Links mobile */}
                <nav>
                  <ul className="space-y-5">
                    {["Inicio", "Servicios", "Galería", "Contactanos"].map((item) => (
                      <li key={item}>
                        <Link
                          href="/"
                          className={linkClass}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};