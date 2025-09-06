
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

export const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { products, addToCart } = useData();
    const { isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <Link to="/" className="text-primary hover:underline mt-4 inline-block">Go back to Home</Link>
            </div>
        );
    }
    
    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigate('/auth');
            return;
        }
        addToCart(product);
        showToast('Item added to cart!');
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-surface rounded-lg shadow-xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col">
                        <h1 className="text-4xl font-bold text-text-primary mb-2">{product.title}</h1>
                        <p className="text-gray-500 text-sm mb-4">Category: <span className="font-semibold text-primary">{product.category}</span></p>
                        
                        <p className="text-4xl font-extrabold text-primary my-4">₹{product.price.toLocaleString('en-IN')}</p>

                        <div className="mt-4 flex-grow">
                            <h2 className="text-xl font-semibold text-text-primary mb-2">Description</h2>
                            <p className="text-text-secondary leading-relaxed">{product.description}</p>
                        </div>
                        
                        <div className="mt-8">
                            <button 
                                onClick={handleAddToCart}
                                className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-primary-dark transition duration-300"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};