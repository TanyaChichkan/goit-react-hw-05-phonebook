import React, {useState, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';

import ContactList from '../contactList/ContactList';
import Filter from '../filter/Filter';
import ContactForm from '../contactForm/ContactForm';
import Notification from '../notification/Notification';

import styles from '../contactList/ListAnim.module.css';
import notificationStyles from '../notification/NotAnim.module.css';
import filterStyles from '../filter/FilterAnim.module.css';

const { v4: uuidv4 } = require('uuid');

const ContactsTrackerHook=()=> {

 const[contacts,setContacts]=useState(
   [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56', update: false},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12',update: false},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79',update: false},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26',update: false}
  ]);

  const [filter,setFilter]=useState("");
  const [doubledName,setName] = useState("");

  useEffect(()=>{
    const previousContacts = localStorage.getItem('contacts');
    const prContactsArr=JSON.parse(previousContacts);

    if(previousContacts){
      prContactsArr.length>0 && setContacts([...prContactsArr])
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem("contacts",JSON.stringify(contacts));
  },[contacts]);

  const addContact=(name,number)=>{
    const contact = {
      id: uuidv4(),
      name,
      number,
      update: false
    };

    const namesArr = contacts.map(item=>item.name);

    namesArr.find(name =>name.toLowerCase() === contact.name.toLowerCase()) ?
      setName(name) :
      setContacts([...contacts, contact]);
  };

  const changeFilter=e=>{
    setFilter(e.target.value)
  };

  const resetName=()=>setName("");

  const getVisibleContacts=()=>{
    return contacts.filter(contact=>
    contact.name.toLowerCase().includes(filter.toLowerCase()))
  };

  const removeContact=e=>{
    console.log(e.target.dataset.id);
    setContacts([...contacts.filter(({id})=> id !== e.target.dataset.id)]);
  };

  const updateContact = e=>{
    setContacts([...contacts.map(contact=> {
    return  contact.id === e.target.dataset.id ?
    {...contact, update: !contact.update} : contact
    })
    ])
  };


    return (
      <>
        <CSSTransition
          in={doubledName.length>0}
          timeout={250}
          classNames={notificationStyles}
          unmountOnExit>
          <Notification name={doubledName} resetName={resetName}/>
        </CSSTransition>

        <ContactForm onAddContact = {addContact}/>

        <h2>Contacts</h2>

        <CSSTransition
          in={contacts.length>1}
          timeout={250}
          classNames={filterStyles}
          unmountOnExit>
          <Filter value={filter} onChangeFilter = {changeFilter}/>
        </CSSTransition>

        <CSSTransition
          in={getVisibleContacts().length >0}
          unmountOnExit
          timeout={250}
          classNames ={styles}
          >
          <ContactList contacts = {getVisibleContacts()} onRemoveContact = {removeContact}
          onUpdateContact = {updateContact}/>
        </CSSTransition>


      </>
    )

};

export default ContactsTrackerHook;