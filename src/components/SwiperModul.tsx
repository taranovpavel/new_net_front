import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import 'swiper/css/navigation';
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import classes from './SwiperModule.module.sass'
import { Link } from 'react-router-dom';

const SwiperModul = () => {
  return (
    <Swiper
      className={classes.MainInner}
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={1}
    >
      <SwiperSlide className={classes.MainCard} style={{backgroundImage: `url(https://www.apple.com/v/home/cf/images/heroes/iphone-family/hero_iphone_family__fuz5j2v5xx6y_large.jpg)`}}  >
        <div className={classes.MainCardInner}>
          <p>Смартфоны</p>
          <Link to={"/phones"} className={classes.MainCardInnerButton}>Купить</Link>
        </div>
      </SwiperSlide>
      <SwiperSlide className={classes.MainCard} style={{backgroundImage: `url(https://www.apple.com/v/home/cf/images/heroes/iphone-family/hero_iphone_family__fuz5j2v5xx6y_large.jpg)`}}  >
        <div className={classes.MainCardInner}>
          <p>Смартфоны</p>
          <Link to={"/phones"} className={classes.MainCardInnerButton}>Купить</Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperModul;