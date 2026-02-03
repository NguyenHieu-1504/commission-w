import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Share2, ShieldCheck, Check } from 'lucide-react';
import ProductService from '../services/product.service';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const data = await ProductService.getProductById(id);
            setProduct(data);
            const imageUrl = data.imageUrl && data.imageUrl.startsWith('/')
                ? `http://localhost:8080${data.imageUrl}`
                : data.imageUrl || 'https://via.placeholder.com/800';
            setMainImage(imageUrl);
        } catch (error) {
            console.error('Error fetching product:', error);
            alert('Product not found!');
            navigate('/gallery');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        // TODO: Implement cart functionality
        alert('Added to cart! (Cart feature coming soon)');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-gray-600">Loading product...</div>
            </div>
        );
    }

    if (!product) {
        return null;
    }

    return (
        <div className="bg-white min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumbs */}
                <nav className="flex mb-8 text-sm text-gray-500">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

                    {/* Left: Images */}
                    <div className="space-y-4">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-lg border border-gray-100">
                            <img src={mainImage} alt={product.title} className="w-full h-full object-cover" />
                            {product.status === 'sold' && (
                                <div className="absolute top-4 left-4">
                                    <span className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full">SOLD OUT</span>
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-4 overflow-x-auto pb-2">
                            {/* For now, just show the main image as thumbnail */}
                            <button
                                onClick={() => setMainImage(mainImage)}
                                className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 border-primary ring-2 ring-primary/20"
                            >
                                <img src={mainImage} alt="Thumbnail" className="w-full h-full object-cover" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div>
                        <div className="mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-primary">
                                {product.category}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
                        <div className="flex items-center mb-6">
                            <img src={`https://ui-avatars.com/api/?name=${product.artist}&background=random`} alt={product.artist} className="w-8 h-8 rounded-full mr-3" />
                            <span className="text-lg text-gray-600">by <span className="font-semibold text-gray-900">{product.artist}</span></span>
                        </div>

                        <div className="text-3xl font-bold text-primary mb-8">{product.price.toLocaleString()} VND</div>

                        <div className="prose prose-sm text-gray-600 mb-8 border-t border-b border-gray-100 py-6">
                            <p>{product.description || 'No description available.'}</p>
                            <ul className="list-disc pl-5 mt-4 space-y-1">
                                <li><strong>Category:</strong> {product.category}</li>
                                <li><strong>Status:</strong> {product.status === 'available' ? 'Available' : 'Sold Out'}</li>
                                <li><strong>Artist:</strong> {product.artist}</li>
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.status === 'sold'}
                                className={`flex-1 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 transform active:scale-95 ${product.status === 'sold'
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-primary hover:bg-cyan-600 text-white'
                                    }`}
                            >
                                <ShoppingCart size={20} />
                                <span>{product.status === 'sold' ? 'Sold Out' : 'Add to Cart'}</span>
                            </button>
                            <button className="flex-none p-4 rounded-xl border border-gray-200 text-gray-500 hover:border-red-500 hover:text-red-500 transition-all">
                                <Heart size={24} />
                            </button>
                            <button className="flex-none p-4 rounded-xl border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-all">
                                <Share2 size={24} />
                            </button>
                        </div>

                        {/* Guarantees */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <ShieldCheck className="text-green-500 mt-1" size={20} />
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">Authenticity Guaranteed</h4>
                                    <p className="text-xs text-gray-500">Verified by ArtSpace experts</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <Check className="text-primary mt-1" size={20} />
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">Free Shipping</h4>
                                    <p className="text-xs text-gray-500">Secure packaging included</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
