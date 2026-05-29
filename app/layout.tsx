import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INSAURRALDE FLOORING | Pulido y Restauración de Pisos en Buenos Aires",
  description: "Servicio profesional de pulido de mármol, plastificado de madera y restauración de pisos en CABA y GBA. Sin obra, sin polvo, resultados premium.",
  keywords: ["pulido de pisos Buenos Aires", "plastificado de parquet", "restauración de mármol", "pulido de hormigón", "INSAURRALDE FLOORING", "pulido de pisos CABA", "pulido de pisos GBA Norte", "pulido de pisos GBA Sur", "pulido de pisos GBA Oeste"],
  authors: [{ name: "INSAURRALDE FLOORING" }],
  openGraph: {
    title: "INSAURRALDE FLOORING | Pulido y Restauración de Pisos",
    description: "Servicio profesional de pulido, plastificado y restauración de pisos en Buenos Aires. Sin obra, sin polvo, resultados premium.",
    url: "https://insaurraldeflooring.com",
    siteName: "INSAURRALDE FLOORING",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INSAURRALDE FLOORING | Pulido y Restauración de Pisos",
    description: "Servicio profesional de pulido, plastificado y restauración de pisos en Buenos Aires.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "INSAURRALDE FLOORING",
  "description": "Servicio profesional de pulido, plastificado y restauración de pisos en Buenos Aires",
  "url": "https://insaurraldeflooring.com",
  "telephone": "+54 11 9999-9999",
  "email": "contacto@insaurraldeflooring.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Buenos Aires",
    "addressRegion": "CABA",
    "addressCountry": "AR"
  },
  "areaServed": [
    { "@type": "City", "name": "CABA" },
    { "@type": "AdministrativeArea", "name": "GBA Norte" },
    { "@type": "AdministrativeArea", "name": "GBA Sur" },
    { "@type": "AdministrativeArea", "name": "GBA Oeste" }
  ],
  "priceRange": "$$",
  "openingHours": "Mo-Sa 08:00-19:00",
  "image": "https://insaurraldeflooring.com/logo.png",
  "sameAs": [],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de restauración de pisos",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pulido y Plastificado de Pisos",
          "description": "Pulido y plastificado de pisos de madera, parquet y pinotea"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hidrolaqueado",
          "description": "Acabado ecológico a base de agua para pisos de madera"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Restauración de Pisos",
          "description": "Reparación de juntas, piezas sueltas y daños por humedad"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pulido de Mármol",
          "description": "Pulido de mármol, granito y mosaico granítico"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pulido de Hormigón",
          "description": "Pulido de hormigón industrial, comercial y garages"
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}