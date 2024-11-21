// src/contexts/NotificationContext.tsx

import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface Notification {
  message: string;
  severity: AlertColor;
}

interface NotificationContextProps {
  showNotification: (message: string, severity: AlertColor) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  // memoizing the function to prevent infinite loops in useEffect
  const showNotification = useCallback((message: string, severity: AlertColor) => {
    setNotification({ message, severity });
  }, []);

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Snackbar
          open
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
};
