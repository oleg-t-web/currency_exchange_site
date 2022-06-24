import { Alert } from '@mui/material';
import React from 'react';
import './Modal.css';

const Modal = () => {
  return (
    <Alert severity="warning" onClose={() => {}}>
      This is a success alert — check it out!
    </Alert>
  );
};

export default Modal;
