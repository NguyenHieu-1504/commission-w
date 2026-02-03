import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Loader } from 'lucide-react';
import AuthService from '../services/auth.service';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        const username = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const password = e.target.password.value;

        try {
            await AuthService.register(username, email, password, phone);
            alert("Registration Successful! Please login.");
            navigate('/login');
        } catch (error) {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join our community of art lovers
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    {message && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{message}</span>
                        </div>
                    )}
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input id="name" name="name" type="text" required className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Username" />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input id="email" name="email" type="email" required className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Email address" />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input id="phone" name="phone" type="tel" required className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Phone Number" />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input id="password" name="password" type="password" required className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg hover:shadow-xl"
                        >
                            {loading ? <Loader className="animate-spin h-5 w-5" /> : "Sign Up"}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <span className="text-sm text-gray-600">Already have an account? </span>
                    <Link to="/login" className="font-medium text-secondary hover:text-orange-600">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
