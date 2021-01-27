import React, { Component } from 'react';

import ContactList from '../contactList/ContactList';
import Filter from '../filter/Filter';
import ContactForm from '../contactForm/ContactForm';

const { v4: uuidv4 } = require('uuid');

export default class ContactsTracker extends Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56', update: false},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12',update: false},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79',update: false},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26',update: false},
    ],
    filter:"",
  };

  componentDidMount(){

    const previousContacts = localStorage.getItem('contacts');

    if(previousContacts){
      this.setState({
        contacts: JSON.parse(previousContacts)
      })
    }

  }

  componentDidUpdate(prevProps, prevState){

    if(prevState.contacts !== this.state.contacts){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }


  addContact=(name,number)=>{
    const contact = {
      id: uuidv4(),
      name,
      number,
      update: false
    };

    const namesArr = this.state.contacts.map(item=>item.name);

      namesArr.find(name =>name.toLowerCase() === contact.name.toLowerCase()) ?
        alert(`${name} is already in the list`) :

        this.setState(prevState=>{
          return {
            contacts: [...prevState.contacts, contact]
          };
    });

  };

  changeFilter=e=>{
    this.setState({filter:e.target.value})
  };

  getVisibleContacts=()=>{
    const {contacts,filter} = this.state;

    return contacts.filter(contact=>
    contact.name.toLowerCase().includes(filter.toLowerCase()))
  };

  removeContact=e=>{
    console.log(e.target)
    const contactID = e.target.dataset.id;
    this.setState({
        contacts: [...this.state.contacts.filter(({id})=> id !== contactID)]
    });
  };

  updateContact = e=>{
    this.setState(prevState=>{
     return {
       contacts: prevState.contacts.map(contact=>{
         return contact.id === e.target.dataset.id ?
         {...contact, update: !contact.update} : contact
       })
     }
    });

  };

  render() {
    const {filter,contacts} = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <ContactForm onAddContact = {this.addContact}/>
        <h2>Contacts</h2>
        {contacts.length>1 &&
        <Filter value={filter} onChangeFilter = {this.changeFilter}/>}

        {visibleContacts.length >0 && (
          <ContactList contacts = {visibleContacts} onRemoveContact = {this.removeContact}
          onUpdateContact = {this.updateContact}/>
        )}

      </div>
    )
  }
};



