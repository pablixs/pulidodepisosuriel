"use client";

import Image from "next/image";

export default function WhatsappBtn() {
  return (
    <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50 transition-transform hover:translate-y-3">
      <a
        href="https://wa.me/5511999999999"
        className="flex group relative"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 p-2 bg-green-600 text-white font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity border-2 border-white whitespace-nowrap hidden md:block">
          Envianos un mensaje
        </span>
        <Image
          src="/wsp.png"
          alt="WhatsApp"
          width={48}
          height={48}
          className="w-12 h-12 md:w-20 md:h-20"
        />
      </a>
    </div>
  );
}