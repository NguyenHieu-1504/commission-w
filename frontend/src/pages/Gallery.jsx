import React, { useState, useEffect } from 'react';
import { Filter, Search, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductService from '../services/product.service';

const Gallery = () => {
    const [paintings, setPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const categories = ['All', 'Landscape', 'Abstract', 'Portrait', 'Modern', 'Still Life'];
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, searchTerm]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await ProductService.getAllProducts(
                selectedCategory !== 'All' ? selectedCategory : null,
                searchTerm || null
            );
            setPaintings(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setPaintings([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-gray-600">Loading gallery...</div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Art Gallery</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our exclusive collection of hand-picked artworks from emerging local talents.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search art or artist..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                {paintings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {paintings.map((painting) => (
                            <div key={painting.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">

                                {/* Image */}
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    <Link to={`/product/${painting.id}`}>
                                        <img
                                            src={painting.imageUrl && painting.imageUrl.startsWith('/')
                                                ? `http://localhost:8080${painting.imageUrl}`
                                                : painting.imageUrl || 'https://via.placeholder.com/400'}
                                            alt={painting.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 transition-colors shadow-sm">
                                            <Heart size={18} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                                                const exists = cart.find(item => item.id === painting.id);
                                                if (exists) {
                                                    alert('Item already in cart!');
                                                } else {
                                                    cart.push(painting);
                                                    localStorage.setItem('cart', JSON.stringify(cart));
                                                    alert('Added to cart!');
                                                }
                                            }}
                                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-500 hover:text-primary transition-colors shadow-sm"
                                        >
                                            <ShoppingCart size={18} />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white text-xs font-semibold bg-primary/90 px-2 py-1 rounded">
                                            {painting.category}
                                        </span>
                                    </div>
                                    {painting.status === 'sold' && (
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">SOLD</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-grow flex flex-col justify-between">
                                    <div>
                                        <Link to={`/product/${painting.id}`}>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-primary transition-colors line-clamp-1">{painting.title}</h3>
                                        </Link>
                                        <p className="text-sm text-gray-500 mb-3">by <span className="font-medium text-gray-700">{painting.artist}</span></p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
                                        <span className="text-lg font-bold text-primary">{painting.price.toLocaleString()} VND</span>
                                        <Link to={`/product/${painting.id}`} className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <Filter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No artworks found</h3>
                        <p className="mt-1 text-gray-500">Try adjusting your search or filters.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                            className="mt-6 text-primary hover:text-cyan-700 font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
