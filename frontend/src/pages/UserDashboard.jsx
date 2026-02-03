import React from 'react';
import { Package, Heart, LogOut, Settings, Clock, CheckCircle } from 'lucide-react';

const UserDashboard = () => {
    // Mock Data
    const orders = [
        { id: '#ORD-7829', date: 'Oct 24, 2025', status: 'Delivered', total: '2,500,000 VND', items: ['Sunset over Lake'] },
        { id: '#ORD-8821', date: 'Nov 02, 2025', status: 'Processing', total: '5,000,000 VND', items: ['Abstract Dreams'] },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 text-center border-b border-gray-100">
                                <img src="https://ui-avatars.com/api/?name=User+Name&background=06b6d4&color=fff" alt="User" className="w-20 h-20 rounded-full mx-auto mb-3" />
                                <h3 className="font-bold text-gray-900">Nguyen Van A</h3>
                                <p className="text-sm text-gray-500">user@example.com</p>
                            </div>
                            <nav className="p-4 space-y-1">
                                <a href="#" className="flex items-center px-4 py-3 bg-primary/10 text-primary font-medium rounded-xl transition-colors">
                                    <Package size={20} className="mr-3" /> My Orders
                                </a>
                                <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl transition-colors">
                                    <Heart size={20} className="mr-3" /> Favorites
                                </a>
                                <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-xl transition-colors">
                                    <Settings size={20} className="mr-3" /> Settings
                                </a>
                                <div className="pt-4 mt-4 border-t border-gray-100">
                                    <a href="#" className="flex items-center px-4 py-3 text-red-500 hover:bg-red-50 font-medium rounded-xl transition-colors">
                                        <LogOut size={20} className="mr-3" /> Sign Out
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>

                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
                                    <div className="flex flex-wrap justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                                            <p className="text-sm text-gray-500 flex items-center mt-1">
                                                <Clock size={14} className="mr-1" /> {order.date}
                                            </p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {order.status === 'Delivered' ? <CheckCircle size={14} className="mr-1" /> : <Clock size={14} className="mr-1" />}
                                            {order.status}
                                        </div>
                                    </div>

                                    <div className="border-t border-b border-gray-50 py-4 mb-4">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">Items:</span> {order.items.join(', ')}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-bold text-primary">{order.total}</p>
                                        <button className="text-sm font-medium text-gray-600 hover:text-primary border border-gray-200 hover:border-primary px-4 py-2 rounded-lg transition-all">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
