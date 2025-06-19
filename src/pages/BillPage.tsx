import React, { useEffect, useState } from 'react';
import classes from './BillPage.module.sass'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import { decrementCount, incrementCount, removeItem } from '../redux/cartSlice';
import { notifyProduct, useAppDispatch } from '../redux/telegram';
import Container from '../components/Container';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ThankYou from './ThankYou';


type ErrorType = {
  error: boolean
}
type ValuesType = {
  [key: string]: string;
};
type InputsType = {
  label: string
  placeholder: string
  key: string
  regular: RegExp
}
const BillPage = () => {
  const dispatch = useAppDispatch();
  
  const items = useSelector((state: RootState) => state.cart.items);
  const [errors,setErrors] = useState<ErrorType[]>([{error: true},{error: true},{error: true}])
  const [values,setValues] = useState<ValuesType>({name: "",phone: "",email: ""})
  const [delivery,setDelivery] = useState("Самовывоз")
  const [payment,setPayment] = useState("Наличными")
  const [allPrice,setAllPrice] = useState<number>(0)
  const [isModal,setIsModal] = useState<boolean>(false)
  const inputs : InputsType[] = [
    {
      label: "Ваше имя",
      placeholder: "Введите ФИО",
      key: "name",
      regular: /^[A-Za-zА-Яа-яЁё]{3,}$/
    },
    {
      label: "Укажите номер для связи",
      placeholder: "+996(000)000-000",
      key: "phone",
      regular: /^\+996\s?(\(?\d{3}\)?)[\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{2}$/
    },
    {
      label: "Укажите e-mail",
      placeholder: "NewNetwork@gmail.com",
      key: "email",
      regular: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    }
  ]
  useEffect(()=>{
    let price = 0
    for(let i=0; i<items.length;i++){
      price+=items[i].price*items[i].count
    }
    setAllPrice(price)
  },[items]) 


  const onNotify = () => {
    let error = 0
    for(let i=0;i<errors.length;i++){
      if(errors[i].error){
        error+=1
      }
    }
    if(error===0){
      // dispatch(notifyProduct(`Имя: ${values.name}\nТелефон: ${values.phone}\nПочта: ${values.email}\nСпособ доставки: ${delivery}\nСпособ оплаты ${payment}\n\nТовары \n\n${items.map((item)=>`${item.name}\n${item.memory}\n${item.color}\nКоличество: ${item.count}\n${item.price.toLocaleString('ru-RU')} сом\n`)}\n\nСумма заказа: ${allPrice.toLocaleString('ru-RU')} сом`));}
      dispatch(notifyProduct(`${values.name}\n${values.phone}\n${values.email}\n${delivery}\n${payment}\n\nТовары \n\n${items.map((item)=>`${item.name}\n${item.memory}\n${item.color}\nКоличество: ${item.count}\n${(item.price*item.count).toLocaleString('ru-RU')} сом\n\n`)}Сумма заказа: ${allPrice.toLocaleString('ru-RU')} сом`));}
      setIsModal(true)
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={classes.Wrapper}>
      <Container>
        <div className={classes.Main}>
          <div className={classes.MainLocalHeader}>
            <p>Ваш заказ</p>
            <Link className={classes.MainLocalHeaderButton} to={"/"}>×</Link>
          </div>
          <div className={classes.MainInner}>
            <div className={classes.MainInnerLeft}>
              <div className={classes.MainInnerLeftInputs}>
                {inputs.map((item,idx)=>
                  <div key={idx} className={classes.MainInnerLeftInputsInput}>
                    <p className={classes.MainInnerLeftInputsInputLabel}>{item.label}</p>
                    <div className={classes.MainInnerLeftInputsInputInner}>
                      <input
                        className={errors[idx].error?classes.MainInnerLeftInputsInputInnerInputError:classes.MainInnerLeftInputsInputInnerInputSuccess}
                        type="text"
                        placeholder={item.placeholder}
                        value={values[item.key]}
                        onChange={(e) => {
                          setErrors(prev => {
                          const updated = [...prev];  
                          updated[idx] = { ...updated[idx], error: !item.regular.test(e.target.value)}; 
                          return updated;
                          });
                          setValues(prev => ({
                            ...prev,
                            [item.key]: e.target.value
                          }));
                        }}
                      />
                      {errors[idx].error?
                        <p className={classes.MainInnerLeftInputsInputInnerHelperText}>Обязательное поле</p>
                        :
                        ""
                      }
                    </div>
                  </div>
                )}
              </div>
              <div className={classes.MainInnerLeftRadio}>
                <p className={classes.MainInnerLeftRadioLabel}>Способо доставки</p>
                <div className={classes.MainInnerLeftRadioInner}>
                  <label>
                    <input
                      type="radio"
                      value="Самовывоз"
                      checked={delivery === "Самовывоз"}
                      onChange={(e) => setDelivery(e.target.value)}
                    />
                    Самовывоз 
                  </label>   
                  <label>
                    <input
                      type="radio"
                      value="Доставка курьером"
                      checked={delivery === "Доставка курьером"}
                      onChange={(e) => setDelivery(e.target.value)}
                    />
                    Доставка курьером
                  </label>
                </div>  
              </div>
              <div className={classes.MainInnerLeftRadio}>
                <p className={classes.MainInnerLeftRadioLabel}>Способо оплаты</p>
                <div className={classes.MainInnerLeftRadioInner}>
                  <label>
                    <input
                      type="radio"
                      value="Наличными"
                      checked={payment === "Наличными"}
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    Наличными при получении 
                  </label>   
                  <label>
                    <input
                      type="radio"
                      value="Онлайн"
                      checked={payment === "Онлайн"}
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    Оплатить картой/с баланса телефона/эл. кошелек/интернет-банкинг
                  </label>
                </div>  
              </div>
              <button 
                className={classes.MainInnerLeftButton}
                onClick={()=>{onNotify()}}
              >
                Оформить заказ
              </button>
            </div>
            <div className={classes.MainInnerRight}>
              <div className={classes.MainInnerRightItems}>
                {items.map((item,idx)=>
                  <div key={idx} className={classes.MainInnerRightItemsItem}>
                    <div className={classes.MainInnerRightItemsItemImage} style={{backgroundImage: `url(${item.photo})`}} />
                    <div className={classes.MainInnerRightItemsItemInfo}>
                      <p className={classes.MainInnerRightItemsItemInfoLabel}>{item.name}</p>
                      <p className={classes.MainInnerRightItemsItemInfoText}>Цвет: {item.color}</p>
                      <p className={classes.MainInnerRightItemsItemInfoText}>Память: {item.memory}</p>
                      <p className={classes.MainInnerRightItemsItemInfoText}>ID: {item.id}</p>
                    </div>
                    <div className={classes.MainInnerRightItemsItemButtons}>
                      <p>{item.count}</p>
                    </div>
                    <div className={classes.MainInnerRightItemsItemRight}>
                      <p className={classes.MainInnerRightItemsItemPrice}>{(item.price*item.count).toLocaleString('ru-RU')}</p>
                    </div>
                  </div>
                )}
              </div>
              <p className={classes.MainInnerRightPrice}>Сумма: {allPrice.toLocaleString('ru-RU')} сом</p>
            </div>
          </div>
        </div>
      </Container>
      <Footer/>
      {
        isModal?
          <ThankYou/>
        :
          "" 
      }
    </div>

  );
};

export default BillPage;