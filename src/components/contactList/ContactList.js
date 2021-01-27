import React from 'react';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

import ContactListItem from '../contactListItem/ContactListItem';

import styles from './ContactList.module.css';
import contactStyles from './ListAnim.module.css';

import PropTypes from 'prop-types';


const ContactList = ({contacts,onRemoveContact,onUpdateContact})=>(
  <TransitionGroup component="ul" className = {styles.list}>
  {contacts.map((item)=>(
    <CSSTransition key={item.id} timeout={250} classNames={contactStyles}>
      <ContactListItem
      update= {item.update}
      {...item}
      onRemove={onRemoveContact}
      onUpdate={onUpdateContact}
      />
    </CSSTransition>
  ))}
</TransitionGroup>
)

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
     id:PropTypes.string.isRequired,
     name: PropTypes.string.isRequired,
     number: PropTypes.string.isRequired,
     update:PropTypes.bool.isRequired,
  }),).isRequired,
  onRemoveContact: PropTypes.func.isRequired,
  onUpdateContact: PropTypes.func.isRequired
};

export default ContactList;
