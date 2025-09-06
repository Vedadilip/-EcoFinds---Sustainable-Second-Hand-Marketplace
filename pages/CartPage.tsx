
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { useToast } from '../hooks/useToast';

export const CartPage: React.FC = () => {
    const { cart, removeFromCart, checkout } = useData();
    const { showToast } = useToast();
    const navigate = useNavigate();
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        checkout();
        showToast('Thank you for your purchase!');
        navigate('/purchases');
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-text-primary mb-6">Shopping Cart</h1>
            {cart.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <div className="bg-surface rounded-lg shadow-md overflow-hidden">
                             <ul className="divide-y divide-gray-200">
                                {cart.map(item => (
                                    <li key={item.id} className="p-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded-md mr-4" />
                                            <div>
                                                <h2 className="font-semibold text-lg text-text-primary">{item.title}</h2>
                                                <p className="text-text-secondary">Quantity: {item.quantity}</p>
                                                <p className="text-primary font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">&times;</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="lg:w-1/3">
                        <div className="bg-surface p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>₹{total.toLocaleString('en-IN')}</span>
                            </div>
                             <div className="flex justify-between mb-4">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                            <hr className="my-4"/>
                            <div className="flex justify-between font-bold text-xl">
                                <span>Total</span>
                                <span>₹{total.toLocaleString('en-IN')}</span>
                            </div>
                            <button onClick={handleCheckout} className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 bg-surface rounded-lg">
                    <h2 className="text-2xl font-semibold text-text-primary">Your cart is empty.</h2>
                    <Link to="/" className="text-primary hover:underline mt-4 inline-block">Continue Shopping</Link>
                </div>
            )}
        </div>
    );
};