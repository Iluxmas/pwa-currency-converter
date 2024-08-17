import React from 'react';
import { Paragraph } from '../ui/Paragraph/Paragraph';

import styles from './Footer.module.css';

type FooterProps = {
  updateTime: string;
  displayedDate: string;
};

export const Footer: React.FC<FooterProps> = ({ updateTime, displayedDate }) => {
  return (
    <footer className={styles.root}>
      {!!updateTime && (
        <Paragraph>
          Last updated at: <time dateTime={updateTime}>{displayedDate || 'not available'}</time>
        </Paragraph>
      )}
    </footer>
  );
};

export default Footer;
