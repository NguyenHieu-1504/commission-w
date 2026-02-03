import React, { useState, useEffect } from 'react';
import { PlusCircle, Image as ImageIcon, MessageSquare, Trash2, Edit, X } from 'lucide-react';
import ProductService from '../services/product.service';
import AuthService from '../services/auth.service';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        price: '',
        description: '',
        category: 'Abstract',
        imageUrl: '',
        status: 'available'
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is ADMIN
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser || !currentUser.roles.includes('ROLE_ADMIN')) {
            alert('Access denied. Admin role required.');
            navigate('/');
            return;
        }
        fetchProducts();
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            const data = await ProductService.getAllProducts();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price)
            };

            if (editingProduct) {
                await ProductService.updateProduct(editingProduct.id, productData);
                alert('Product updated successfully!');
            } else {
                await ProductService.createProduct(productData);
                alert('Product added successfully!');
            }

            setShowModal(false);
            resetForm();
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product. Please try again.');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title,
            artist: product.artist,
            price: product.price.toString(),
            description: product.description || '',
            category: product.category || 'Abstract',
            imageUrl: product.imageUrl || '',
            status: product.status || 'available'
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await ProductService.deleteProduct(id);
                alert('Product deleted successfully!');
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product.');
            }
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8080/api/upload/image', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            setFormData(prev => ({ ...prev, imageUrl: data.url }));
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        }
    };

    const resetForm = () => {
        setEditingProduct(null);
        setFormData({
            title: '',
            artist: '',
            price: '',
            description: '',
            category: 'Abstract',
            imageUrl: '',
            status: 'available'
        });
    };

    const openAddModal = () => {
        resetForm();
        setShowModal(true);
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <div className="flex gap-3">
                        <Link
                            to="/admin/home-settings"
                            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center transition-all"
                        >
                            <ImageIcon className="mr-2" size={20} /> Home Settings
                        </Link>
                        <button
                            onClick={openAddModal}
                            className="bg-primary hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center transition-all"
                        >
                            <PlusCircle className="mr-2" size={20} /> Add New Painting
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Stats Cards */}
                    <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Artworks</h3>
                            <p className="text-3xl font-bold text-primary">{products.length} Items</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium mb-2">Available</h3>
                            <p className="text-3xl font-bold text-green-600">
                                {products.filter(p => p.status === 'available').length}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium mb-2">Sold</h3>
                            <p className="text-3xl font-bold text-gray-400">
                                {products.filter(p => p.status === 'sold').length}
                            </p>
                        </div>
                    </div>

                    {/* Main Content: Product List */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h2 className="font-bold text-gray-900 text-lg">Inventory Management</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                                            <th className="px-6 py-4 font-semibold">Painting</th>
                                            <th className="px-6 py-4 font-semibold">Category</th>
                                            <th className="px-6 py-4 font-semibold">Price</th>
                                            <th className="px-6 py-4 font-semibold">Status</th>
                                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                            {product.imageUrl ? (
                                                                <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" />
                                                            ) : (
                                                                <ImageIcon size={16} className="text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                            <div className="text-xs text-gray-500">{product.artist}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                    {product.price.toLocaleString()} VND
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {product.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {products.length === 0 && (
                                    <div className="text-center py-10 text-gray-500">
                                        No products yet. Add your first painting!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Chat Widget Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h2 className="font-bold text-gray-900 flex items-center">
                                    <MessageSquare size={18} className="mr-2 text-primary" /> Live Chat
                                </h2>
                            </div>
                            <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96">
                                <div className="bg-gray-50 p-3 rounded-lg rounded-tl-none">
                                    <p className="text-xs text-gray-500 mb-1">User A • 2m ago</p>
                                    <p className="text-sm text-gray-800">Is the sunset painting available?</p>
                                </div>
                                <div className="bg-primary/10 p-3 rounded-lg rounded-tr-none ml-auto text-right">
                                    <p className="text-xs text-gray-500 mb-1">You • Just now</p>
                                    <p className="text-sm text-gray-800">Yes, it is ready to ship!</p>
                                </div>
                            </div>
                            <div className="p-4 border-t border-gray-100">
                                <input
                                    type="text"
                                    placeholder="Reply..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Product Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingProduct ? 'Edit Painting' : 'Add New Painting'}
                            </h2>
                            <button
                                onClick={() => { setShowModal(false); resetForm(); }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Artist</label>
                                <input
                                    type="text"
                                    name="artist"
                                    value={formData.artist}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (VND)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="Abstract">Abstract</option>
                                    <option value="Landscape">Landscape</option>
                                    <option value="Portrait">Portrait</option>
                                    <option value="Still Life">Still Life</option>
                                    <option value="Modern">Modern</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                <div className="space-y-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                    />
                                    {formData.imageUrl && (
                                        <div className="relative w-full h-32 border border-gray-200 rounded-lg overflow-hidden">
                                            <img src={formData.imageUrl.startsWith('/') ? `http://localhost:8080${formData.imageUrl}` : formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleInputChange}
                                        placeholder="Or paste image URL"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="available">Available</option>
                                    <option value="sold">Sold</option>
                                </select>
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-primary hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                                >
                                    {editingProduct ? 'Update' : 'Add'} Painting
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setShowModal(false); resetForm(); }}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
