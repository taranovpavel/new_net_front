import React, { SetStateAction, Dispatch } from 'react';
import classes from './Shop.module.sass'
import Sort from './Sort';
import CardProduct from './CardProduct';


type ProductType = {
  brand: string
  id: number
  name: string
  photos: string
  price: string
};

type ShopPropsType = {
  products: ProductType[];
  minPrice: number;
  maxPrice: number;
  brand: Record<string, boolean>;
  setMinPrice: Dispatch<SetStateAction<number>>;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  setBrand: Dispatch<SetStateAction<Record<string, boolean>>>;
  brands: string[]
};


const Shop = ({products,maxPrice,minPrice,brand,setMaxPrice,setMinPrice,setBrand,brands}:ShopPropsType) => {

  return (
    <div className={classes.Main}>
      <div className={classes.MainInner}>
        <Sort
          minPrice={minPrice}
          maxPrice={maxPrice}
          brand={brand}
          setBrand={setBrand}
          setMaxPrice={setMaxPrice}
          setMinPrice={setMinPrice}
          brands={brands}
        />
        <div className={classes.MainInnerRight}>
          {products.map((item,idx)=>
            <CardProduct key={idx} obj={item}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;