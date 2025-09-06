
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 mt-auto">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-text-secondary">
                <p>&copy; {new Date().getFullYear()} EcoFinds. All rights reserved.</p>
                <p className="text-sm">Promoting a sustainable future, one pre-loved item at a time.</p>
            </div>
        </footer>
    );
};
