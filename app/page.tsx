'use client'

import { useState } from 'react'
import { Nav } from '@/app/components/layout/Navbar'
import  Content  from '@/app/components/sections/Content';
import NuestrosServicios from '@/app/components/sections/NuestrosServicios';
import ContactForm from '@/app/components/sections/ContactForm';
import WhatsappBtn from '@/app/components/ui/WhatsappBtn';
import BeforeAfter from '@/app/components/sections/BeforeAfter';
import Gallery from '@/app/components/sections/Gallery';

export default function Home() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <main className='bg-(--color-bg) '>

      <div className="bg-center bg-cover " style={{ backgroundImage: `url(industrialmain.jpeg)` }} >
        <header className="absolute inset-x-0 top-0 z-50">
          <Nav />
        </header>

        <div className="relative  px-6 pt-14 lg:px-8 bg-neutral-900/70" >

          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 ">

            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                Restaura tus pisos de viejos a <span className='text-(--ns-accent3) italic'>nuevos</span>
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
                Servicio profesional de pulido, plastificado y restauración de pisos en Buenos Aires
              </p>

            </div>
          </div>
        </div>


      </div>
      <Content />

      <NuestrosServicios/>

      <BeforeAfter/>      

      <Gallery/>

      <ContactForm/>


      <WhatsappBtn />
    </main>

  )
}
