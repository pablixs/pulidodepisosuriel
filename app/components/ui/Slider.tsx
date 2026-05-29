"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SLIDE_IMAGES = [
  { src: "https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png", alt: "Servicio de pulido de pisos" },
  { src: "https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png", alt: "Resultado de restauración" },
  { src: "https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png", alt: "Piso plastificado" },
  { src: "https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png", alt: "Pulido de mármol" },
  { src: "https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png", alt: "Restauración de madera" },
];

export default function Slide() {
  return (
    <Swiper
      pagination={{ type: 'progressbar' }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      style={{ width: '100%', height: '100%' }}
    >
      {SLIDE_IMAGES.map((img, i) => (
        <SwiperSlide key={i}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}