import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, LogOut } from 'lucide-react';
import AuthService from '../services/auth.service';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
        navigate('/login');
    };

    return (
        <nav className="bg-surface shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                ArtSpace
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">Home</Link>
                        <Link to="/gallery" className="text-gray-700 hover:text-primary transition-colors font-medium">Gallery</Link>
                        {currentUser && (
                            <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors font-medium">Dashboard</Link>
                        )}
                        {currentUser && currentUser.roles.includes("ROLE_ADMIN") && (
                            <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors font-medium">Admin</Link>
                        )}
                    </div>

                    {/* Right Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-gray-600 hover:text-primary transition-colors">
                            <Search size={20} />
                        </button>
                        <Link to="/cart" className="text-gray-600 hover:text-primary transition-colors relative">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                0
                            </span>
                        </Link>

                        {currentUser ? (
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-700">Hi, {currentUser.username}</span>
                                <button
                                    onClick={logOut}
                                    className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium border border-gray-300 px-4 py-1.5 rounded-full hover:border-primary transition-all">
                                <User size={18} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Home</Link>
                        <Link to="/gallery" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Gallery</Link>
                        <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Cart</Link>
                        {currentUser ? (
                            <button onClick={logOut} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50">Sign Out ({currentUser.username})</button>
                        ) : (
                            <Link to="/login" className="block w-full text-center px-3 py-2 mt-4 rounded-md text-base font-medium bg-primary text-white hover:bg-cyan-600">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
