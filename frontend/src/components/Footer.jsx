import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                            ArtSpace
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Discover unique paintings and connect with talented artists.
                            Bring color to your life.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-secondary transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Gallery</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Artists</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="text-primary mt-1 mr-3 shrink-0" size={18} />
                                <span className="text-gray-600">123 Art Avenue, Creative City, VN</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="text-primary mr-3 shrink-0" size={18} />
                                <span className="text-gray-600">+84 123 456 789</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="text-primary mr-3 shrink-0" size={18} />
                                <span className="text-gray-600">hello@artspace.vn</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} ArtSpace. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
