import { Alert, Snackbar } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";

const showNotification = ({ type, message }: NotifyProps) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(
      (
    <Snackbar 
          anchorOrigin={{ vertical: 'top', horizontal:'right' }}
          open={true} 
          sx={{position: 'fixed', zIndex: 1500}}
    >
      <Alert severity={type} sx={{ width: '100%' }}>
          {message}
      </Alert>
    </Snackbar>


),
      container
    );

    setTimeout(() => {
      document.body.removeChild(container);
    }, 5000);
  };

  export default showNotification;

  interface NotifyProps {
    type: MessageType,
    message: string
  }

  type MessageType = 'success' | 'error' | 'warning' | 'info';
