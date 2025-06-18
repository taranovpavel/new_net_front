import React, { useEffect, useState } from 'react';
import classes from './ModalPage.module.sass'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux';
import { decrementCount, incrementCount, removeItem, setIsModal } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const ModalPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const isModal = useSelector((state: RootState) => state.cart.isModal);
  const [allPrice,setAllPrice] = useState<number>(0)
  const [isClosing,setIsClosing] = useState<boolean>(true)
  useEffect(()=>{
    if(!items.length){
      setIsClosing(true);
      setTimeout(() => {
        dispatch(setIsModal(false));
      }, 600);
    }
  },[items]) 
  useEffect(()=>{
    setTimeout(() => {
      setIsClosing(false);
    }, 0);
  },[isModal]) 
  useEffect(()=>{
    let price = 0
    for(let i=0; i<items.length;i++){
      price+=items[i].price*items[i].count
    }
    setAllPrice(price)
  },[items]) 
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={classes.BackGround}>
      <div 
        className={`${isClosing?classes.Main:classes.MainOpening}`}
        onClick={() => {
          setIsClosing(true);
          setTimeout(() => {
            dispatch(setIsModal(false));
          }, 600);
        }}
      />
      <div className={classes.MainWrapper}>
      <div className={`${isClosing?classes.MainWrapperInner:classes.MainWrapperInnerOpening}`}>
        <div className={classes.MainWrapperInnerTop}>
          <p>Ваш заказ</p>
          <button   
            onClick={() => {
              setIsClosing(true);
              setTimeout(() => {
                dispatch(setIsModal(false));
              }, 600);
            }}
          >
            ×
          </button>
        </div>
        <div className={classes.MainWrapperInnerLine}/>
          <div className={classes.MainWrapperInnerItems}>
            {items.map((item,idx)=>
              <div key={idx} className={classes.MainWrapperInnerItemsItem}>
                <div className={classes.MainWrapperInnerItemsItemImage} style={{backgroundImage: `url(${item.photo})`}} />
                <div className={classes.MainWrapperInnerItemsItemInfo}>
                  <p className={classes.MainWrapperInnerItemsItemInfoLabel}>{item.name}</p>
                  <p className={classes.MainWrapperInnerItemsItemInfoText}>Цвет: {item.color}</p>
                  <p className={classes.MainWrapperInnerItemsItemInfoText}>Память: {item.memory}</p>
                  <p className={classes.MainWrapperInnerItemsItemInfoText}>ID: {item.id}</p>
                </div>
                <div className={classes.MainWrapperInnerItemsItemButtons}>
                  <button 
                    className={classes.MainWrapperInnerItemsItemButtonsMinus}
                    onClick={()=>{dispatch(decrementCount(item))}}
                  >
                    −
                  </button>
                  <p>{item.count}</p>
                  <button 
                    className={classes.MainWrapperInnerItemsItemButtonsPlus}
                    onClick={()=>{dispatch(incrementCount(item))}}
                  >
                    +
                  </button>
                </div>
                <div className={classes.MainWrapperInnerItemsItemRight}>
                  <p className={classes.MainWrapperInnerItemsItemPrice}>{(item.price*item.count).toLocaleString('ru-RU')}</p>
                  <button
                    onClick={()=>{dispatch(removeItem(item))}}
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={classes.MainWrapperInnerLine}/>
          <p className={classes.MainWrapperInnerPrice}>Сумма: {allPrice.toLocaleString('ru-RU')} сом</p>
          <Link onClick={()=>{dispatch(setIsModal(false))}} to={"/bill"} className={classes.MainWrapperInnerButton}>Оформить заказ</Link>
        </div>
      </div>
    </div>
  );
};

export default ModalPage;