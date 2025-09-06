
import { useContext } from 'react';
import { ToastContext, ToastStateContext } from '../context/ToastContext';

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const useToastState = () => {
    const context = useContext(ToastStateContext);
    if (context === undefined) {
        throw new Error('useToastState must be used within a ToastProvider');
    }
    return context;
};
