import React from 'react';
import styles from './Loading.module.css';

const Loading = () => (
  <div className={styles.loading}>
    <div className={styles.spinner}></div>
    Loading...
  </div>
);

export default Loading;
