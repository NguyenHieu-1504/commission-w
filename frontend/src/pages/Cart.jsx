import React, { useState, useEffect } from 'react';
import { Trash2, AlertCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);
    };

    const handleRemove = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const total = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <ul className="divide-y divide-gray-100">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="p-6 flex items-center">
                                        <img
                                            src={item.imageUrl && item.imageUrl.startsWith('/')
                                                ? `http://localhost:8080${item.imageUrl}`
                                                : item.imageUrl || 'https://via.placeholder.com/100'}
                                            alt={item.title}
                                            className="h-24 w-24 object-cover rounded-md border border-gray-200"
                                        />
                                        <div className="ml-6 flex-1">
                                            <div className="flex justify-between">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                                                        {item.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-lg font-bold text-gray-900">{(item.price || 0).toLocaleString()} VND</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">Artist: {item.artist}</p>
                                            <div className="mt-4 flex justify-between items-center bg-gray-50 p-2 rounded-lg sm:bg-transparent sm:p-0">
                                                <span className="text-green-600 text-sm flex items-center">
                                                    <AlertCircle size={14} className="mr-1" /> {item.status === 'available' ? 'In Stock' : 'Sold'}
                                                </span>
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center transition-colors px-3 py-1 rounded-full hover:bg-red-50"
                                                >
                                                    <Trash2 size={16} className="mr-1" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-base text-gray-600">
                                        <p>Subtotal</p>
                                        <p>{total.toLocaleString()} VND</p>
                                    </div>
                                    <div className="flex justify-between text-base text-gray-600">
                                        <p>Shipping</p>
                                        <p className="text-green-600">Free</p>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                                        <p>Total</p>
                                        <p>{total.toLocaleString()} VND</p>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-3">
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-primary hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center"
                                    >
                                        Proceed to Checkout <ArrowRight className="ml-2" size={18} />
                                    </button>
                                </div>
                                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                    <p>
                                        or <Link to="/gallery" className="text-primary font-medium hover:text-cyan-500">Continue Shopping</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added any masterpieces to your collection yet.</p>
                        <Link to="/gallery" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-cyan-600 shadow-lg hover:shadow-xl transition-all">
                            Start Exploring
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
