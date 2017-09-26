import React from 'react';
import styles from './input.scss';

class Input extends React.Component {
 constructor(props){
   super(props);
 }

 render() {
   return <input className={styles.sulu} value="Input EOA"/>
 }
}

export default Input;
