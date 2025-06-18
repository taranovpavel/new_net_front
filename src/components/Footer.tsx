import React from 'react';
import classes from './Footer.module.sass'
import { ReactComponent as Point } from '../images//icon-point.svg';
import { ReactComponent as Inst } from '../images//icon-inst.svg';
import { ReactComponent as Telegram } from '../images//icon-telegram.svg';
import { ReactComponent as Whatsapp } from '../images//icon-whatsapp.svg';
import { ReactComponent as TwoGis } from '../images//icon-twoGis.svg';

const Footer = () => {
  return (
    <div className={classes.Main}>
      <div className={classes.MainTop}>
        <div className={classes.MainTopLeft}>
          <p className={classes.MainTopLabel}>Режим работы</p>
          <p>Пн-Вс 10:00-20:00</p>
          <div className={classes.MainTopLeftInner}>
            <p className={classes.MainTopLeftInnerLogo}>НОВАЯ СЕТЬ</p> 
            <p className={classes.MainTopLeftInnerText}>19 лет на рынке</p>
          </div>
        </div>
        <div className={classes.MainTopRight}>
          <div className={classes.MainTopRightArray}>
            <p className={classes.MainTopLabel}>Продукция</p>
            <p>Телефоны</p>
            <p>Наушники</p>
            <p>Часы</p>
            <p>Другое</p>
          </div>
          <div className={classes.MainTopRightArray}>
            <p className={classes.MainTopLabel}>Контакты</p>
            <p>+996500000134</p>
            <p>г.Бишкек:</p>
            <p className={classes.MainTopRightArrayWIcon}><Point/> 10 мкр, дом 34</p>
            <p className={classes.MainTopRightArrayWIcon}><Point/> ГУМ, 1-й этаж, бутик А23</p>
          </div>
          <div className={classes.MainTopRightArray}>
            <p className={classes.MainTopLabel}>Наши соцсети</p>
            <p className={classes.MainTopRightArrayWIcon}><Inst className={classes.MainTopRightArrayIcon}/> Instagram</p>
            <p className={classes.MainTopRightArrayWIcon}><Telegram className={classes.MainTopRightArrayIcon}/> Telegram</p>
            <p className={classes.MainTopRightArrayWIcon}><Whatsapp className={classes.MainTopRightArrayIcon}/> WhatsApp</p>
            <p className={classes.MainTopRightArrayWIcon}><TwoGis className={classes.MainTopRightArrayIcon}/> 2GIS</p>
          </div>
        </div>  
      </div>
      <div className={classes.MainLine}/>
      <div className={classes.MainBottom}>
        <p>© 2025 New Networ. Все права защищены</p>
        <div className={classes.MainBottomCenter}>
          <p>Политика конфидициальности</p>
          <p>Пользовательское соглашение</p>
          <p>Публичная оферта</p>
        </div>
        <p>Разработка сайта</p>
      </div>
    </div>
  );
};

export default Footer;