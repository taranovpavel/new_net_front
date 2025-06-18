import React, { SetStateAction, Dispatch } from 'react';
import classes from './Sort.module.sass'

type ShopPropsType = {
  minPrice: number;
  maxPrice: number;
  brand: Record<string, boolean>;
  setMinPrice: Dispatch<SetStateAction<number>>;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  setBrand: Dispatch<SetStateAction<Record<string, boolean>>>;
  brands: string[]
};

const Sort = ({maxPrice,minPrice,brand,setMaxPrice,setMinPrice,setBrand,brands}:ShopPropsType) => {
  return (
    <div className={classes.Main}>
      <div className={classes.MainPrice}>
        <input
          type="text"
          className={classes.MainPriceLeft}
          placeholder="Цена от"
          value={minPrice}
          onChange={(e)=>{setMinPrice(Number(e.target.value))}}
        />
        <span>–</span>
        <input
          className={classes.MainPriceRight}
          type="text"
          placeholder="до"
          value={maxPrice}
          onChange={(e)=>{setMaxPrice(Number(e.target.value))}}
        />
      </div>
      <div className={classes.MainBlock}>
        <p className={classes.MainBlockLabel}>Бренды</p>
        {brands.map((item,idx)=>
          <div key={idx} className={classes.MainBlockChecks}>
            <label>
              <input 
                type="checkbox"
                checked = {brand[item]}
                onChange={() => setBrand({ ...brand, [item]: !brand[item] })}
              />
              <span/>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sort;