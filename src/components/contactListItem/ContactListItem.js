import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactListItem.module.css';

const ContactListItem = function({id,name,number,onRemove,update,onUpdate}){

  const updatedClass = update ? styles.updated : styles['not-updated'];
  const textUpdatedClass = update ? styles['text-updated'] : styles['text-not-updated'];
  const buttonUpdatedClass= update ? styles['button-updated'] : styles['button-not-updated'];

  return (
    <li className = {updatedClass}>
      <span className = {textUpdatedClass}>{name}: {number}</span>

      <div className = {styles.wrapper}>
        <label className = {styles.itemLabel}>update</label>
        <input type="checkbox"
        checked = {update}
        onChange = {onUpdate}
        className = {styles.inputItem}
        data-id={id}/>

        <button type="button" onClick={onRemove} data-id={id} className={buttonUpdatedClass}>Delete</button>
      </div>
    </li>
  )
}

ContactListItem.propTypes = {
     id:PropTypes.string,
     name: PropTypes.string.isRequired,
     number: PropTypes.string.isRequired,
     update:PropTypes.bool.isRequired,
     onRemove:PropTypes.func.isRequired,
     onUpdate: PropTypes.func.isRequired
};

export default ContactListItem;