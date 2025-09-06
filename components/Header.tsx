
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.938 4.01a.75.75 0 01.53.22l5.25 5.25a.75.75 0 01-1.06 1.06L10 5.81V13.5a.75.75 0 01-1.5 0V5.81L3.72 10.54a.75.75 0 01-1.06-1.06l5.25-5.25a.75.75 0 01.53-.22z" clipRule="evenodd" transform="rotate(45 10 10)" />
        <path d="M10 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c.04 0 .09 0 .13.003C6.39 2.41 2 6.74 2 12c0 4.41 3.59 8 8 8z" />
    </svg>
);

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useData();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    const navLinkClasses = "text-gray-600 hover:text-primary transition duration-300";
    const activeNavLinkClasses = "text-primary font-semibold";

    const navLinks = (
        <>
            <NavLink to="/" className={({isActive}) => isActive ? activeNavLinkClasses : navLinkClasses}>Home</NavLink>
            {user ? (
                <>
                    <NavLink to="/my-listings" className={({isActive}) => isActive ? activeNavLinkClasses : navLinkClasses}>My Listings</NavLink>
                    <NavLink to="/purchases" className={({isActive}) => isActive ? activeNavLinkClasses : navLinkClasses}>Purchases</NavLink>
                    <NavLink to="/profile" className={({isActive}) => isActive ? activeNavLinkClasses : navLinkClasses}>Profile</NavLink>
                </>
            ) : (
                <NavLink to="/auth" className={({isActive}) => isActive ? activeNavLinkClasses : navLinkClasses}>Login / Sign Up</NavLink>
            )}
        </>
    );

    return (
        <header className="bg-primary-light shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <LeafIcon />
                        <span className="text-2xl font-bold text-primary">EcoFinds</span>
                    </Link>
                    
                    <nav className="hidden md:flex items-center space-x-6">
                       {navLinks}
                    </nav>

                    <div className="flex items-center space-x-4">
                         <Link to="/cart" className="relative text-gray-600 hover:text-primary">
                            <CartIcon />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cart.length}</span>
                            )}
                        </Link>
                        {user && (
                           <button onClick={handleLogout} className="hidden md:block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300 text-sm">Logout</button>
                        )}
                         <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-primary focus:outline-none">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                 {isMenuOpen && (
                    <div className="md:hidden py-4">
                        <nav className="flex flex-col space-y-4 items-center">
                            {navLinks}
                            {user && (
                                <button onClick={handleLogout} className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300 text-sm">Logout</button>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
