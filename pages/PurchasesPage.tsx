import React from 'react';
import { useData } from '../hooks/useData';
import { Link } from 'react-router-dom';

export const PurchasesPage: React.FC = () => {
    const { purchases } = useData();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-text-primary mb-6">Previous Purchases</h1>
            {purchases.length > 0 ? (
                <div className="bg-surface rounded-lg shadow-md overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {purchases.map((item, index) => (
                             <li key={`${item.id}-${index}`} className="p-4 flex flex-col sm:flex-row items-center justify-between">
                                <div className="flex items-center mb-4 sm:mb-0">
                                    <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-md mr-4" />
                                    <div>
                                        <h2 className="font-semibold text-lg text-text-primary">{item.title}</h2>
                                        <p className="text-primary font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                                         <p className="text-text-secondary text-sm">Category: {item.category}</p>
                                    </div>
                                </div>
                                <Link to={`/product/${item.id}`} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-sm transition duration-300">
                                    View Item
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-center py-16 bg-surface rounded-lg">
                    <h2 className="text-2xl font-semibold text-text-primary">You haven't made any purchases yet.</h2>
                    <Link to="/" className="text-primary hover:underline mt-4 inline-block">Start Shopping</Link>
                </div>
            )}
        </div>
    );
};