import React from 'react';
import styles from './Footer.module.css';
import { Typography } from '@mui/material';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Paragraph } from '../ui/Paragraph/Paragraph';

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
