import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { useToast } from '../hooks/useToast';
import { generateDescription } from '../lib/gemini';
import { Category } from '../types';

export const AddEditProductPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { products, addProduct, updateProduct } = useData();
    const { showToast } = useToast();
    const isEditMode = Boolean(id);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState<Category>(Category.OTHER);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            const productToEdit = products.find(p => p.id === id);
            if (productToEdit) {
                setTitle(productToEdit.title);
                setDescription(productToEdit.description);
                setPrice(String(productToEdit.price));
                setCategory(productToEdit.category);
            }
        }
    }, [id, isEditMode, products]);

    const handleGenerateDescription = async () => {
        if (!title) {
            showToast('Please enter a product title first.', 'error');
            return;
        }
        setIsGenerating(true);
        try {
            const generatedDesc = await generateDescription(title, category);
            setDescription(generatedDesc);
            showToast('Description generated successfully!');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred.';
            showToast(message, 'error');
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const productData = {
            title,
            description,
            price: parseFloat(price),
            category,
            imageUrl: `https://picsum.photos/seed/${Date.now()}/800/600`, // Placeholder
            sellerId: user.id,
        };

        if (isEditMode && id) {
            updateProduct({ ...productData, id });
        } else {
            addProduct(productData);
        }
        
        navigate('/my-listings');
    };


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto bg-surface p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-text-primary mb-6">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                     <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value as Category)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                            {Object.values(Category).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                             <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                             <button 
                                type="button" 
                                onClick={handleGenerateDescription}
                                disabled={!title || isGenerating}
                                className="text-sm font-medium text-accent hover:text-primary-dark disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
                            >
                                {isGenerating ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Generating...</span>
                                    </>
                                ) : (
                                    <span>✨ Generate with AI</span>
                                )}
                            </button>
                        </div>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={5} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                 <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                <p className="text-sm text-gray-600">Image upload placeholder</p>
                                <button type="button" className="font-medium text-primary hover:text-primary-dark">+ Add Image (Placeholder)</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300">{isEditMode ? 'Save Changes' : 'Submit Listing'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};