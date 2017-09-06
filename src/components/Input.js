import React from 'react';
import styles from './input.scss';

class Input extends React.Component {
 constructor(props){
   super(props);
 }

 render() {
console.log(styles)
   return <input className={styles.sulu} value="Huckberries WHat?asdfas??asdf"/>
 }
}

export default Input;
