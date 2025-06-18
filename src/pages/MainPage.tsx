import React from 'react';
import classes from './MainPage.module.sass'
import Header from '../components/Header';
import Container from '../components/Container';
import SwiperModul from '../components/SwiperModul';
import Card from '../components/Card';
import CardVideo from '../components/CardVideo';
import Footer from '../components/Footer';
import ModalPage from './ModalPage';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

const MainPage = () => {
  const isModal = useSelector((state: RootState) => state.cart.isModal);
  const cardsVideo = [
    {
      title: "iPhone",
      text: "Выбать модель",
      video: "https://www.apple.com/105/media/us/iphone/family/2025/e7ff365a-cb59-4ce9-9cdf-4cb965455b69/anim/welcome/xlarge_2x.mp4"
    },
    {
      title: "Samsung",
      text: "Выбать модель",
      video: "https://images.samsung.com/is/content/samsung/assets/ru/ux3/home/Hero_KV_Home_PC_1920x1080.mp4"
    },
    {
      title: "Xiaomi",
      text: "Выбать модель",
      video: "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-15-ultra/pc/erwsdxcftgvyhb.mp4"
    },
  ]
  const cards = [
    {
      title: "Наушники",
      text: "Выбать модель",
      img: "https://static.tildacdn.one/tild3538-3466-4333-a363-356632653430/all-airpodsmin.png"
    },
    {
      title: "Часы",
      text: "Выбать модель",
      img: "https://static.tildacdn.one/tild3737-3164-4337-a536-306162623261/all-watchesmin.png"
    },
    {
      title: "Другое",
      text: "Посмотреть",
      img: "https://assets.xboxservices.com/assets/13/c9/13c9e42e-7802-4437-be3d-e694ae180578.jpg?n=999666_Content-Placement-0_Accessory-hub_740x417.jpg"
    },
  ]
  return (
    <>
      <Header/>
      <Container>
        <SwiperModul/>
        <div className={classes.Cards}>
          {cardsVideo.map((item,idx)=>
            <CardVideo
              key={idx}
              title={item.title}
              text={item.text}
              video={item.video}
            />        
          )}
          {cards.map((item,idx)=>
            <Card
              key={idx}
              title={item.title}
              text={item.text}
              img={item.img}
            />        
          )}
        </div>
        <div className={classes.About}>
          <p>НОВАЯ СЕТЬ - Магазин сотовых телефонов и аксессуаров</p>
        </div>
      </Container>
      <Footer/>
      {isModal?
        <ModalPage/>
        :
        ""
      }
    </>
  );
};

export default MainPage;