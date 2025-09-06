
import React from 'react';
import { useToastState } from '../hooks/useToast';

export const ToastContainer: React.FC = () => {
    const { message, type, isVisible } = useToastState();

    const bgColor = type === 'success' ? 'bg-primary' : 'bg-red-500';

    return (
        <div
            aria-live="assertive"
            className={`fixed top-5 right-5 z-[100] transition-transform duration-300 ease-in-out ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
        >
            <div className={`flex items-center p-4 rounded-lg shadow-lg text-white ${bgColor}`}>
                <p>{message}</p>
            </div>
        </div>
    );
};