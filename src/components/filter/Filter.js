import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';


export default function Filter({value, onChangeFilter}){
  return (
    <div className={styles.Filter}>
      <label htmlFor="filter">Find contacts by name</label><br/>
      <input type = "text"
      value = {value}
      onChange={onChangeFilter}
      className={styles.FilterInput}
      id="filter"/>
    </div>
  )
}

Filter.propTypes = {
  value:PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired
};