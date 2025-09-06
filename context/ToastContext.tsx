
import React, { createContext, useState, useCallback, ReactNode } from 'react';

interface ToastContextType {
    showToast: (message: string, type?: 'success' | 'error') => void;
}

interface ToastState {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
export const ToastStateContext = createContext<ToastState | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toastState, setToastState] = useState<ToastState>({
        message: '',
        type: 'success',
        isVisible: false,
    });

    const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
        setToastState({ message, type, isVisible: true });
        setTimeout(() => {
            setToastState(prevState => ({ ...prevState, isVisible: false }));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            <ToastStateContext.Provider value={toastState}>
                {children}
            </ToastStateContext.Provider>
        </ToastContext.Provider>
    );
};