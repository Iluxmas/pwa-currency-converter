import React from 'react';
import styles from './Footer.module.css';

type FooterProps = {
  updateTime: string;
  displayedDate: string;
};

export const Footer: React.FC<FooterProps> = ({ updateTime, displayedDate }) => {
  return (
    <footer className={styles.root}>
      {!!updateTime && (
        <p className={styles.date}>
          Last updated at: <time dateTime={updateTime}>{displayedDate || 'not available'}</time>
        </p>
      )}
    </footer>
  );
};

export default Footer;
