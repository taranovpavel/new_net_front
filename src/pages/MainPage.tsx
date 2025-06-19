import React, { useEffect } from 'react';
import classes from './MainPage.module.sass'
import Header from '../components/Header';
import Container from '../components/Container';
import SwiperModul from '../components/SwiperModul';
import Card from '../components/Card';
import CardVideo from '../components/CardVideo';
import Footer from '../components/Footer';
import ModalPage from './ModalPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import Loader from '../components/Loader';
import { setSortBrand } from '../redux/cartSlice';

const MainPage = () => {
  const dispatch = useDispatch()
  const isModal = useSelector((state: RootState) => state.cart.isModal);
  const cardsVideo = [
    {
      title: "iPhone",
      text: "Выбать модель",
      video: "https://www.apple.com/105/media/us/iphone/family/2025/e7ff365a-cb59-4ce9-9cdf-4cb965455b69/anim/welcome/xlarge_2x.mp4",
      brand: "apple"
    },
    {
      title: "Samsung",
      text: "Выбать модель",
      video: "https://images.samsung.com/is/content/samsung/assets/ru/ux3/home/Hero_KV_Home_PC_1920x1080.mp4",
      brand: "samsung"
    },
    {
      title: "Xiaomi",
      text: "Выбать модель",
      video: "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-15-ultra/pc/erwsdxcftgvyhb.mp4",
      brand: "xiaomi"
    },
  ]
  const cards = [
    {
      title: "Наушники",
      text: "Посмотреть",
      img: "https://pngimg.com/uploads/airPods/airPods_PNG6.png"
    },
    {
      title: "Часы",
      text: "Посмотреть",
      img: "https://purepng.com/public/uploads/large/apple-watch-pcq.png"
    },
    {
      title: "Другое",
      text: "Посмотреть",
      img: "https://purepng.com/public/uploads/large/purepng.com-gamepadgamepadgame-controlhandheld-controllervideo-games-controller-1701528353499nhgz5.png"
    },
  ]
  
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setSortBrand("none"))
  }, []);
 
  return (
    <div className={classes.Wrapper}>
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
              brand={item.brand}
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
    </div>
  );
};

export default MainPage;