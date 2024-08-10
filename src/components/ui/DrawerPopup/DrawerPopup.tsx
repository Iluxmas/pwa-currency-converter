import React, { ReactNode } from 'react';
import Drawer from '@mui/material/Drawer/Drawer';
import styles from './DrawerPopup.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const DrawerPopup: React.FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <Drawer anchor='bottom' open={isOpen} onClose={onClose}>
      <div className={styles.innerContainer}>{children}</div>
    </Drawer>
  );
};
