import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Upload, ArrowLeft } from 'lucide-react';
import AuthService from '../services/auth.service';

const HomeSettings = () => {
    const [settings, setSettings] = useState({
        heroImageUrl: '',
        featuredImageUrls: ['', '', '', '']
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is ADMIN
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser || !currentUser.roles.includes('ROLE_ADMIN')) {
            alert('Access denied. Admin role required.');
            navigate('/');
            return;
        }
        fetchSettings();
    }, [navigate]);

    const fetchSettings = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/settings/home');
            const data = await response.json();
            setSettings(data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e, index = null) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8080/api/upload/image', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            const imageUrl = data.url;

            if (index === null) {
                // Hero image
                setSettings(prev => ({ ...prev, heroImageUrl: imageUrl }));
            } else {
                // Featured image
                const newFeatured = [...settings.featuredImageUrls];
                newFeatured[index] = imageUrl;
                setSettings(prev => ({ ...prev, featuredImageUrls: newFeatured }));
            }

            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/settings/home', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });

            if (!response.ok) throw new Error('Save failed');

            alert('Settings saved successfully! Reload the Home page to see changes.');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Failed to save settings.');
        }
    };

    const getImageUrl = (url) => {
        if (!url) return 'https://via.placeholder.com/400';
        return url.startsWith('/') ? `http://localhost:8080${url}` : url;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Home Page Settings</h1>
                        <p className="text-gray-600 mt-1">Manage hero image and featured artworks</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin')}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft size={20} className="mr-1" /> Back to Admin
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Hero Image Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Hero Section Image</h2>
                        <div className="space-y-4">
                            <div className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                                <img
                                    src={getImageUrl(settings.heroImageUrl)}
                                    alt="Hero"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, null)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            />
                        </div>
                    </div>

                    {/* Featured Images Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Featured Artworks (4 images)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Featured #{index + 1}
                                    </label>
                                    <div className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                                        <img
                                            src={getImageUrl(settings.featuredImageUrls[index])}
                                            alt={`Featured ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, index)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className="bg-primary hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg flex items-center transition-all"
                        >
                            <Save className="mr-2" size={20} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSettings;
