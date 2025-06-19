import React, { useEffect, useState } from 'react';
import classes from './ProductPage.module.sass';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';
import ProductSwiper from '../components/ProductSwiper';
import ProductInfo from '../components/ProductInfo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../redux/phoneSlice';
import { AppDispatch, RootState } from '../redux';
import { useParams } from 'react-router-dom';
import ModalPage from './ModalPage';
import Loader from '../components/Loader';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading, error } = useSelector((state: RootState) => state.phone);
  const isModal = useSelector((state: RootState) => state.cart.isModal);
  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);


  return (
    <div className={classes.Wrapper}>
      <Header />
      <Container>
        <div className={classes.Main}>
          {loading && <Loader/>}

          {!loading && error && <p>Ошибка загрузки товара</p>}

          {!loading && !error && product && id &&(
            <>
              {product.images && <ProductSwiper images={product.images} />}
              <ProductInfo item={product} id={Number(id)}/>
            </>
          )}
        </div>
      </Container>
      <Footer />
      {isModal?
        <ModalPage/>
        :
        ""
      }
    </div>
  );
};

export default ProductPage;