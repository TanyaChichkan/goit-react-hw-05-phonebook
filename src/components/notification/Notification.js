import React,{useEffect} from 'react';
import { CSSTransition } from 'react-transition-group';
import notStyles from './Notification.module.css';
import styles from './NotAnim.module.css';


const Notification=({name="",resetName})=>{

  useEffect(()=>{
    const timer = setTimeout(()=>{resetName()},2000);
    return ()=>{
      clearTimeout(timer);
    }
  },[]);

  return(

    <div className={notStyles.alertWrapper}>
      <p className={notStyles.alertText}>{name && name[0].toUpperCase()+name.slice(1)} is already in the list!!!</p>
    </div>

  )
};

export default Notification;


