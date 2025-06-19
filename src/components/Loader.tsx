import React from 'react';
import classes from './Loader.module.sass'


const Loader = () => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Loader}>
        <div className={classes.LoaderCircle}/>
        <div className={classes.LoaderCircle}/>
        <div className={classes.LoaderCircle}/>
        <div className={classes.LoaderCircle}/>
      </div>
    </div>
  );
};

export default Loader;