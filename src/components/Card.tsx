import React from 'react';
import classes from './Card.module.sass'

type CardPropsType = {
  title: string,
  text: string,
  img: string
}



const Card = ({title,text,img}:CardPropsType) => {
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