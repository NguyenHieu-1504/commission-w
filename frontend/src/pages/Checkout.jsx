import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, Phone, Mail, ArrowLeft } from 'lucide-react';
import OrderService from '../services/order.service';
import AuthService from '../services/auth.service';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        district: '',
        note: '',
        paymentMethod: 'cod'
    });

    useEffect(() => {
        // Check if user is logged in
        const user = AuthService.getCurrentUser();
        if (!user) {
            alert('Please login to checkout');
            navigate('/login');
            return;
        }

        // Load cart
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length === 0) {
            alert('Your cart is empty');
            navigate('/cart');
            return;
        }

        setCartItems(cart);

        // Pre-fill user email
        setFormData(prev => ({ ...prev, email: user.email || '' }));
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                items: cartItems.map(item => ({
                    productId: item.id,
                    productTitle: item.title,
                    productImageUrl: item.imageUrl,
                    price: item.price,
                    quantity: 1
                })),
                totalAmount: total,
                shippingAddress: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    district: formData.district,
                    note: formData.note
                },
                email: formData.email,
                phone: formData.phone,
                paymentMethod: formData.paymentMethod
            };

            const response = await OrderService.createOrder(orderData);

            // Clear cart
            localStorage.removeItem('cart');

            // Navigate to success page
            alert('Order placed successfully! Order ID: ' + response.id);
            navigate('/dashboard');

        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const total = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate('/cart')}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft size={20} className="mr-1" /> Back to Cart
                </button>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Contact Information */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <User size={20} className="mr-2" /> Contact Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <MapPin size={20} className="mr-2" /> Shipping Address
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Street address, apartment number"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                            <input
                                                type="text"
                                                name="district"
                                                value={formData.district}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
                                        <textarea
                                            name="note"
                                            value={formData.note}
                                            onChange={handleInputChange}
                                            rows="2"
                                            placeholder="Delivery instructions, etc."
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <CreditCard size={20} className="mr-2" /> Payment Method
                                </h2>
                                <div className="space-y-2">
                                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formData.paymentMethod === 'cod'}
                                            onChange={handleInputChange}
                                            className="mr-3"
                                        />
                                        <span className="text-gray-900 font-medium">Cash on Delivery (COD)</span>
                                    </label>
                                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="bank_transfer"
                                            disabled
                                            className="mr-3"
                                        />
                                        <span className="text-gray-900 font-medium">Bank Transfer (Coming Soon)</span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all disabled:bg-gray-400"
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-3">
                                        <img
                                            src={item.imageUrl && item.imageUrl.startsWith('/')
                                                ? `http://localhost:8080${item.imageUrl}`
                                                : item.imageUrl || 'https://via.placeholder.com/60'}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                                            <p className="text-sm text-gray-500">{(item.price || 0).toLocaleString()} VND</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-2">
                                <div className="flex justify-between text-base text-gray-600">
                                    <p>Subtotal</p>
                                    <p>{total.toLocaleString()} VND</p>
                                </div>
                                <div className="flex justify-between text-base text-gray-600">
                                    <p>Shipping</p>
                                    <p className="text-green-600">Free</p>
                                </div>
                                <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
                                    <p>Total</p>
                                    <p>{total.toLocaleString()} VND</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
