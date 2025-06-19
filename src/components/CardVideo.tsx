import React from 'react';
import classes from './CardVideo.module.sass'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSortBrand } from '../redux/cartSlice';


type CardVideoPropsType = {
  title: string,
  text: string,
  video: string,
  brand: string
}

const CardVideo = ({title,text,video,brand}:CardVideoPropsType) => {
  const dispatch = useDispatch()
  return (
    <Link to={"/phones"} onClick={()=>{dispatch(setSortBrand(brand))}} className={classes.Main}>
      <div className={classes.MainTop}>
        <p className={classes.MainTopLabel}>{title}</p>
        <button className={classes.MainTopBtn}>
          <p className={classes.MainTopBtnText}>{text}</p>
          <div className={classes.MainTopBtnArrow}>
            <p className={classes.MainTopBtnArrowInner}>→ →</p>
          </div>
        </button>
      </div>
      <div className={classes.MainBottom}>
        <video
          className={classes.MainBottomVideo}
          preload="auto" 
          playsInline={false}
          autoPlay={true}
          loop={true}
          muted={true}
          style={{ display: 'block', maxWidth: '100%' }}
        >
          <source src={video} type="video/mp4"/>
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    </Link>
  );
};

export default CardVideo;