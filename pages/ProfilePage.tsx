
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

export const ProfilePage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const { showToast } = useToast();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }
    
    const handleSave = () => {
        updateUser({ ...user, username, email });
        setIsEditing(false);
        showToast('Profile updated successfully!');
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-lg mx-auto bg-surface p-8 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <img className="h-24 w-24 rounded-full object-cover mb-4" src={`https://i.pravatar.cc/150?u=${user.id}`} alt="User avatar" />
                    <h1 className="text-3xl font-bold text-text-primary">User Dashboard</h1>
                </div>
                <div className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            readOnly={!isEditing}
                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm read-only:bg-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                         <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly={!isEditing}
                            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm read-only:bg-gray-200"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        {isEditing ? (
                            <>
                                <button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
                                <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">Save</button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">Edit Profile</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};