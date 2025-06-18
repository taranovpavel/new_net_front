import React from 'react';
import classes from './Card.module.sass'

type CardPropsType = {
  title: string,
  text: string,
  img: string
}



const Card = ({title,text,img}:CardPropsType) => {

  const obj = {
    id: 1,
    name: "iPhone 16 Pro Max",
    prices: [600,700,800],
    memories: ["256GB","512GB","1TB"],
    images: ["url","url","url","url","url","url"],
    colors: [
      {
        color: "Черный",
        HEX: "#000"
      },
      {
        color: "Белый",
        HEX: "#fff"
      },
      {
        color: "Синий",
        HEX: "#0ef"
      }
    ],
    isAvailable: [
      {
        // 256
        black: true,
        white: true,
        blue: true
      },
      {
        // 512
        black: true,
        white: true,
        blue: true
      },
      {
        // 1tb
        black: true,
        white: true,
        blue: true
      },
    ]
  }

  return (
    <div className={classes.Main}>
      <div className={classes.MainTop}>
        <p className={classes.MainTopLabel}>{title}</p>
        <button className={classes.MainTopBtn}>
          <p className={classes.MainTopBtnText}>{text}</p>
          <div className={classes.MainTopBtnArrow}>
            <p className={classes.MainTopBtnArrowInner}>→ →</p>
          </div>
        </button>
      </div>
      <div className={classes.MainBottom} style={{backgroundImage: `url(${img})`}}/>
    </div>  
  );
};

export default Card;