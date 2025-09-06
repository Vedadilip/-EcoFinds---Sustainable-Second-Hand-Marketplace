import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';

export const MyListingsPage: React.FC = () => {
    const { user } = useAuth();
    const { products, deleteProduct } = useData();

    const userProducts = products.filter(p => p.sellerId === user?.id);

    const handleDelete = (productId: string) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            deleteProduct(productId);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-text-primary">My Listings</h1>
                <Link to="/add-product" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300">
                    Add New Product
                </Link>
            </div>
            
            {userProducts.length > 0 ? (
                <div className="bg-surface rounded-lg shadow-md overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {userProducts.map(product => (
                            <li key={product.id} className="p-4 flex flex-col sm:flex-row items-center justify-between">
                                <div className="flex items-center mb-4 sm:mb-0">
                                    <img src={product.imageUrl} alt={product.title} className="w-24 h-24 object-cover rounded-md mr-4" />
                                    <div>
                                        <h2 className="font-semibold text-lg text-text-primary">{product.title}</h2>
                                        <p className="text-primary font-bold">₹{product.price.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Link to={`/edit-product/${product.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">Edit</Link>
                                    <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                 <div className="text-center py-16 bg-surface rounded-lg">
                    <h2 className="text-2xl font-semibold text-text-primary">You have no listings yet.</h2>
                    <p className="text-text-secondary mt-2">Click "Add New Product" to get started!</p>
                </div>
            )}
        </div>
    );
};