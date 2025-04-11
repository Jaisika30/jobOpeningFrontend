import { styled } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';

export const CustomToastContainer = styled(ToastContainer)(({ theme }) => ({
  '.Toastify__toast': {
    backgroundColor: '#f5f5f5 !important',
    borderRadius: '8px !important',
    padding: '8px 16px !important',
    minWidth: '240px !important',
    maxWidth: '300px !important',
    fontSize: '8px !important',
    textAlign: 'center !important',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1) !important',
  },
  '.Toastify__toast-body': {
    color: '#333 !important',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif !important',
    margin: '0 auto',
  },
  '.Toastify__close-button': {
    color: '#666 !important',
  },
}));
