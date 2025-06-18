import React, { useEffect } from 'react';
import classes from './ThankYou.module.sass'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';

const ThankYou = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={classes.BackGround}>
      <div className={classes.Main}/>
      <div className={classes.MainWrapper}>
        <p>Ваш заказ успешно оформлен. Наш менеджер свяжется с вами в ближайшее время для подтверждения деталей. Пожалуйста, оставайтесь на связи.</p>
        <Link className={classes.Button} onClick={()=>{dispatch(clearCart())}} to={"/"}>На главную</Link>
      </div>
    </div>
  );
};

export default ThankYou;