
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-9xl font-extrabold text-primary">404</h1>
            <h2 className="text-3xl font-bold text-text-primary mt-4">Page Not Found</h2>
            <p className="text-text-secondary mt-2">Sorry, the page you are looking for does not exist.</p>
            <Link
                to="/"
                className="mt-6 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition duration-300"
            >
                Go Back Home
            </Link>
        </div>
    );
};
