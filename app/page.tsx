import Hero from '@/app/components/ui/Hero';
import Content from '@/app/components/sections/Content';
import NuestrosServicios from '@/app/components/sections/NuestrosServicios';
import ContactForm from '@/app/components/sections/ContactForm';
import BeforeAfter from '@/app/components/sections/BeforeAfter';
import Gallery from '@/app/components/sections/Gallery';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero videoSrc='mi-video.mp4'/>
      <Content />
      <NuestrosServicios />
      <BeforeAfter />
      <Gallery />
      <ContactForm />
      <Footer />
    </main>
  );
}