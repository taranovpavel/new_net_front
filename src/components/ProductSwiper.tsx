import React, { useRef } from 'react'
import classes from './ProductSwiper.module.sass'
import type { Swiper as SwiperClass } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'



type SwiperType = {
  images: {
    image_url: string;
  }[];
}

const ProductSwiper = ({images}:SwiperType) => {
const swiperRef = useRef<any>(null)

  return (
    <div className={classes.Main}>
      {/* Основной Swiper */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        onSwiper={(swiper: SwiperClass) => (swiperRef.current = swiper)}
        className={classes.MainSwiper}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className={classes.MainSwiperInner} style={{backgroundImage: `url(${src.image_url})`}}/>
        ))}
      </Swiper>

      {/* Миниатюры */}
      <div className={classes.MainMini}>
        {images.map((src, i) => (
          <div
            key={i}
            style={{backgroundImage: `url(${src.image_url})`}}
            className={classes.MainMiniInner}
            onClick={() => swiperRef.current?.slideTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
export default ProductSwiper;