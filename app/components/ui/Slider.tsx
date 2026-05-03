import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import Swiper styles
import 'swiper/css';

export const Slide = () => {
    return (
    <>
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        
      >
        <SwiperSlide>
            <img src="https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://dictumlimpieza.com/wp-content/uploads/2024/03/PULIDO-DE-PISOS-DICTUM-LIMPIEZA.png" alt="" />
        </SwiperSlide>

      </Swiper>
    </>
  );
}