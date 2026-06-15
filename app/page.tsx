import Hero from '@/app/components/ui/Hero';
import Content from '@/app/components/sections/Content';
import NuestrosServicios from '@/app/components/sections/NuestrosServicios';
import ContactForm from '@/app/components/sections/ContactForm';
import BeforeAfter from '@/app/components/sections/BeforeAfter';
import VideosSection from '@/app/components/sections/VideosSection';
import PulidoCategorizado from '@/app/components/sections/PulidoCategorizado';
import Gallery from '@/app/components/sections/Gallery';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import WhatsappBtn from '@/app/components/ui/WhatsappBtn';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero videoSrc='/mi-video.webm'/>
      <Content />
      <NuestrosServicios />
      <BeforeAfter />
      <VideosSection />
      <PulidoCategorizado />
      <Gallery />
      <ContactForm />
      <Footer />
      <WhatsappBtn />
    </main>
  );
}