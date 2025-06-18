import React from 'react';
import classes from './Container.module.sass'

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className={classes.Main}>{children}</div>;
};

export default Container;