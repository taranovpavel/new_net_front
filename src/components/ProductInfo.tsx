import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classes from './ProductInfo.module.sass'
import { useDispatch } from 'react-redux';
import { addItem, setIsModal } from '../redux/cartSlice';
import { count } from 'console';


type InfoPropsType = {
  item: {
    name: string;
    prices: {
      id: number;
      memory: string;
      price: string;
    }[];
    colors: {
      id: number;
      color_name: string;
      hex_code: string;
    }[];
    availabilites: {
      color_id: number;
      price_id: number;
      is_available: number;
    }[];
    images: {
      image_url: string;
    }[];
  }
  id: number
};
const ProductInfo = ({item,id}:InfoPropsType) => {
  const dispatch = useDispatch()
  const [memoryIndex, setMemoryInex] = useState<number>( 0);
  const [colorIndex,setColorInex] = useState<number>(0)
  const [isAvailable,setIsAvailable] = useState<number>(1)
  
  
  useEffect(() => {
  if (item) {
    const newAvailable = item.availabilites.filter(
      (a) =>
        a.price_id === item.prices[memoryIndex].id &&
        a.color_id === item.colors[colorIndex].id
    );
    if (newAvailable.length > 0) {
      setIsAvailable(newAvailable[0].is_available);
    }
  }
  }, [memoryIndex, colorIndex]);
  return (
    <div className={classes.Main}>
      <div className={classes.MainTop}>
        <p className={classes.MainTopLabel}>{item.name}</p>
        <p className={classes.MainTopPrice}>{Number(item.prices[memoryIndex].price).toLocaleString('ru-RU')} сом</p>
      </div>
      {
        isAvailable===0?
          <p className={classes.MainNoAvailable}>Нет в наличие</p>
        :
          <></>
      }
      
      <div className={classes.MainColors}>
        <p className={classes.MainLabelMini}>Цвет</p>
        <div className={classes.MainColorsInner}>
          {item.colors.map((obj,idx)=>
            <div 
              key={idx} 
              className={colorIndex===idx?classes.MainColorsInnerColorOn:classes.MainColorsInnerColorOff}
              style={{backgroundColor: obj.hex_code}}
              onClick={()=>{setColorInex(idx)}}
            />
          )}
        </div>
        
      </div>
      <div className={classes.MainMemories}>
        <p className={classes.MainLabelMini}>Память</p>
        <div className={classes.MainMemoriesInner}>
          {item.prices.map((item,idx)=>
            <div 
              key={idx} 
              className={memoryIndex===idx?classes.MainMemoriesInnerMemoryOn:classes.MainMemoriesInnerMemoryOff}
              onClick={()=>{setMemoryInex(idx)}}
            >
              {item.memory}
            </div>
          )}
        </div>
      </div>
      {
        isAvailable===0?
          <button>Посмотрите другие варианты</button>
        :
          <button 
            onClick={()=>{
              dispatch(addItem({
                id: id,
                name: item.name,
                price: Number(item.prices[memoryIndex].price),
                photo: item.images[0].image_url,
                memory: item.prices[memoryIndex].memory,
                color: item.colors[colorIndex].color_name,
                count: 1        
              }));
              dispatch(setIsModal(true))
            }}
          >
            Купить
          </button>
      }
    </div>
  );
};

export default ProductInfo;