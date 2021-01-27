import React, {Component} from 'react';
import {CSSTransition} from 'react-transition-group';
import ReactDOM from 'react';
import ContactsTrackerHooks from './components/contactsTracker/ContactsTrackHook';
import styles from './AppAnim.module.css';


const App =()=>{

    return(
      <div className = "container">

        <CSSTransition
          in={true}
          appear
          classNames={styles}
          timeout={250}>
          <h1>Phonebook</h1>
        </CSSTransition>

        <ContactsTrackerHooks/>
      </div>
    )

}

export default App;
