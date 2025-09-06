
import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';
import { useAuth } from './hooks/useAuth';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AuthPage } from './pages/AuthPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { AddEditProductPage } from './pages/AddEditProductPage';
import { ProfilePage } from './pages/ProfilePage';
import { CartPage } from './pages/CartPage';
import { PurchasesPage } from './pages/PurchasesPage';
import { NotFoundPage } from './pages/NotFoundPage';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};


const App: React.FC = () => {
    return (
        <AuthProvider>
            <DataProvider>
                <ToastProvider>
                    <HashRouter>
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-grow">
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/product/:id" element={<ProductDetailPage />} />
                                    <Route path="/auth" element={<AuthPage />} />
                                    
                                    <Route element={<ProtectedRoute />}>
                                        <Route path="/my-listings" element={<MyListingsPage />} />
                                        <Route path="/add-product" element={<AddEditProductPage />} />
                                        <Route path="/edit-product/:id" element={<AddEditProductPage />} />
                                        <Route path="/profile" element={<ProfilePage />} />
                                        <Route path="/cart" element={<CartPage />} />
                                        <Route path="/purchases" element={<PurchasesPage />} />
                                    </Route>
                                    
                                    <Route path="*" element={<NotFoundPage />} />
                                </Routes>
                            </main>
                            <Footer />
                            <ToastContainer />
                        </div>
                    </HashRouter>
                </ToastProvider>
            </DataProvider>
        </AuthProvider>
    );
}

export default App;