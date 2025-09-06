
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../constants';

interface DataContextType {
    products: Product[];
    cart: CartItem[];
    purchases: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (productId: string) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    checkout: () => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>(() => {
        try {
            const localProducts = localStorage.getItem('ecofinds_products');
            return localProducts ? JSON.parse(localProducts) : PRODUCTS;
        } catch (error) {
            return PRODUCTS;
        }
    });

    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const localCart = localStorage.getItem('ecofinds_cart');
            return localCart ? JSON.parse(localCart) : [];
        } catch (error) {
            return [];
        }
    });
    
    const [purchases, setPurchases] = useState<Product[]>(() => {
        try {
            const localPurchases = localStorage.getItem('ecofinds_purchases');
            return localPurchases ? JSON.parse(localPurchases) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('ecofinds_products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('ecofinds_cart', JSON.stringify(cart));
    }, [cart]);
    
    useEffect(() => {
        localStorage.setItem('ecofinds_purchases', JSON.stringify(purchases));
    }, [purchases]);

    const addProduct = (product: Omit<Product, 'id'>) => {
        const newProduct = { ...product, id: `prod-${Date.now()}` };
        setProducts(prev => [...prev, newProduct]);
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const deleteProduct = (productId: string) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    };

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const checkout = () => {
        setPurchases(prev => [...prev, ...cart]);
        setCart([]);
    };

    const value = {
        products,
        cart,
        purchases,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        checkout
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
