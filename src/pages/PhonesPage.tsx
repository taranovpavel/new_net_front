import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';
import classes from './PhonesPage.module.sass'
import Shop from '../components/Shop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../redux/phoneSlice';
import { fetchAllProducts } from '../redux/phonesSlice';
import type { RootState, AppDispatch } from '../redux/index';
import { log } from 'console';
import ModalPage from './ModalPage';
import Loader from '../components/Loader';
import { setSortBrand } from '../redux/cartSlice';


type ProductType = {
  brand: string
  id: number
  name: string
  photos: string
  price: string
};


const PhonesPage = () => {
  const isModal = useSelector((state: RootState) => state.cart.isModal);
  const dispatch = useDispatch<AppDispatch>();
  const sortBrand = useSelector((state: RootState) => state.cart.sortBrand);
  const { products, loading, error } = useSelector((state: RootState) => state.phones);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [])
  const [minPrice,setMinPrice] = useState<number>(0)
  const [maxPrice,setMaxPrice] = useState<number>(0)
  const brands = products.map(p => p.brand.toLowerCase())
  const uniqueBrands = Array.from(new Set(brands));
  const [brand, setBrand] = useState<Record<string, boolean>>({});  
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(products)
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p => Number(p.price));
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));
      setBrand(
        uniqueBrands.reduce((acc, b) => {
          acc[b] = true;
          return acc;
        }, 
      {} as Record<string, boolean>))
    }
  }, [products]);
 
  
  useEffect(()=>{
    console.log(sortBrand);
    if(sortBrand!=="none"){
      setBrand(prev => {
        const updated = Object.fromEntries(
          Object.entries(prev).map(([key, value]) => [
            key,
            key.toLowerCase() === sortBrand.toLowerCase() ? true : false
          ])
        );
        return updated;
      });
    }
  },[sortBrand,products])
  console.log(brand);
  useEffect(() => {
    const filtered = products.filter(p => {
      const price = Number(p.price);
      const brandKey = p.brand.toLowerCase();
      return (
        brand[brandKey] === true &&
        price >= minPrice &&
        price <= maxPrice
      );
    });
    setFilteredProducts(filtered);
  }, [brand, minPrice, maxPrice, products]);

  
  return (
    <div className={classes.Wrapper}>
      <Header/>
        <Container>
          {loading && <Loader/>}

          {!loading && error && <p>Ошибка загрузки товара</p>}

          {!loading && !error && products && (
            <>
              <Shop 
                products={filteredProducts}
                minPrice={minPrice}
                maxPrice={maxPrice}
                brand={brand}
                setBrand={setBrand}
                setMaxPrice={setMaxPrice}
                setMinPrice={setMinPrice}
                brands={brands}
              />
            </>
          )}
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

export default PhonesPage;