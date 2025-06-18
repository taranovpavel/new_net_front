import { RefObject, useEffect, useRef, useState } from 'react';
import classes from './Header.module.sass'
import { ReactComponent as Location } from '../images/iocn-location.svg';
import { ReactComponent as Inst } from '../images//icon-inst.svg';
import { ReactComponent as Telegram } from '../images//icon-telegram.svg';
import { ReactComponent as Whatsapp } from '../images//icon-whatsapp.svg';
import { ReactComponent as Phone } from '../images/icon-phone.svg';
import { ReactComponent as Watch } from '../images//icon-watch.svg';
import { ReactComponent as Pods } from '../images//icon-pods.svg';
import { ReactComponent as Different } from '../images//icon-different.svg';
import { ReactComponent as Shop } from '../images//icon-shop.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux';
import { setIsModal } from '../redux/cartSlice';


const Header = () => {
	const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
	const [count,setCount] = useState(0)
	useEffect(()=>{
		let count = 0
		for(let i=0; i<items.length;i++){
			count+=items[i].count
		}
		setCount(count)
	},[items]) 

  return (
    <div className={classes.Main}>
			<div className={classes.MainTopWrapper}>
				<div className={classes.MainTop}>
					<div className={classes.MainTopLeft}>
						<Location className={classes.MainTopLeftIcon}/>
						<p>ГУМ, 1-й этаж, бутик А23</p>
					</div>
					<div className={classes.MainTopRight}>
						<p className={classes.MainTopRightWork}>
							Пн-Вс 10:00-20:00
						</p>
						<div className={classes.MainTopRightLinks}>
							<Whatsapp/>
							<Telegram/>
							<Inst/>
						</div>
					</div>
				</div>
			</div>
			
			<div className={classes.MainBottom}>
				<Link to={"/"} className={classes.MainBottomLeft}>
					НОВАЯ СЕТЬ
				</Link>
				<div className={classes.MainBottomCenter}>
					<Link to={"/phones"} className={classes.MainBottomCenterTab}>
						<Phone/>
						<p>Смартфоны</p>
					</Link>
					<div className={classes.MainBottomCenterTab}>
						<Watch/>
						<p>Часы</p>
					</div>
					<div className={classes.MainBottomCenterTab}>
						<Pods/>
						<p>Наушники</p>
					</div>
					<div className={classes.MainBottomCenterTab}>
						<Different/>
						<p>Другое</p>
					</div>
				</div>
				<div className={classes.MainBottomRight}>
					<Shop 
						onClick={()=>{
							if(items.length){
								dispatch(setIsModal(true))
							}
						}} 
						className={classes.MainBottomRightIcon}/>
					<div className={classes.MainBottomRightCount}>
						<p>
							{count}
						</p>
					</div>
				</div>
			</div>
		</div>
  );
};

export default Header;