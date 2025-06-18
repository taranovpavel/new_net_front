import React, { useState } from 'react';
import classes from './CardProduct.module.sass'
import { Link } from 'react-router-dom';


type CardPropsType = {
  obj:{
    brand: string
    id: number
    name: string
    photos: string
    price: string
  }
}

const CardProduct = ({obj}:CardPropsType) => {
  const [count, setCount] = useState<number>(0)
  const photoString = obj.photos;
  const photosArray = JSON.parse(photoString);
  return (
    <Link to={`/${obj.id}`} className={classes.Main}>
      <div 
        className={classes.MainPhoto} 
        onMouseEnter={()=>{setCount(1)}}
        onMouseLeave={()=>{setCount(0)}} 
        style={{backgroundImage: `url(${photosArray[count]})`}}
      />
      <div className={classes.MainInfo}>
        <div className={classes.MainInfoInner}>
          <p className={classes.MainInfoInnerName}>{obj.name}</p>
          <p className={classes.MainInfoInnerPrice}>{Number(obj.price).toLocaleString('ru-RU')} сом</p>
        </div>
        <button>
          Подробнее
        </button>
      </div>
    </Link>  
  );
};

export default CardProduct;