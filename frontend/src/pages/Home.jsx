import React from 'react';
import { ArrowRight, Star, Heart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [homeSettings, setHomeSettings] = React.useState({
        heroImageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000',
        featuredImageUrls: [
            'https://images.unsplash.com/photo-1516905041604-7935af78f572?w=800',
            'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800',
            'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800',
            'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800'
        ]
    });

    // Mock Data for Featured Paintings Info (titles, artists, prices)
    const featuredPaintings = [
        { id: 1, title: 'Sunset over Lake', artist: 'Huy Arthur', price: '2,500,000 VND' },
        { id: 2, title: 'Abstract Dreams', artist: 'Mai Lan', price: '5,000,000 VND' },
        { id: 3, title: 'Urban Solitude', artist: 'Tuan Kiet', price: '3,200,000 VND' },
        { id: 4, title: 'Golden Autumn', artist: 'Phuong Thao', price: '4,100,000 VND' },
    ];

    React.useEffect(() => {
        fetch('http://localhost:8080/api/settings/home')
            .then(res => res.json())
            .then(data => setHomeSettings(data))
            .catch(err => console.error('Error fetching home settings:', err));
    }, []);

    const getImageUrl = (url) => {
        if (!url) return 'https://via.placeholder.com/400';
        return url.startsWith('/') ? `http://localhost:8080${url}` : url;
    };

    return (
        <div className="flex flex-col min-h-screen">

            {/* Hero Section */}
            <section className="relative bg-background pt-10 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Text Content */}
                        <div className="z-10">
                            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-secondary font-semibold text-sm mb-6">
                                New Collections Available
                            </span>
                            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
                                Discover <span className="text-primary">Masterpieces</span> <br />
                                for your Space.
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 max-w-lg">
                                Connect directly with talented artists. Buy ready-made paintings or commission unique artwork tailored to your vision.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/gallery" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-cyan-600 shadow-lg hover:shadow-xl transition-all">
                                    Explore Gallery
                                </Link>
                                <Link to="/commission" className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all">
                                    Request Commission
                                    <ArrowRight className="ml-2 -mr-1" size={18} />
                                </Link>
                            </div>
                        </div>

                        {/* Hero Image / Illustration */}
                        <div className="relative">
                            <div className="absolute -top-10 -right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
                            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-60"></div>
                            <img
                                src={getImageUrl(homeSettings.heroImageUrl)}
                                alt="Art piece"
                                className="relative rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Featured Artworks</h2>
                        <p className="mt-4 text-gray-500">Curated picks for this week</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredPaintings.map((painting, index) => (
                            <div key={painting.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <img
                                        src={getImageUrl(homeSettings.featuredImageUrls[index])}
                                        alt={painting.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 transition-colors">
                                            <Heart size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">{painting.title}</h3>
                                    <p className="text-sm text-gray-500 mb-2">by {painting.artist}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-primary">{painting.price}</span>
                                        <button className="text-sm text-gray-600 hover:text-primary font-medium">View</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link to="/gallery" className="inline-flex items-center text-primary font-semibold hover:text-cyan-700">
                            View All Artworks <ArrowRight className="ml-1" size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                                <Star className="text-secondary" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Authentic Art</h3>
                            <p className="text-gray-600">Every piece is verified original. Direct from artists to your collection.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                                <User className="text-primary" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Commission</h3>
                            <p className="text-gray-600">Connect with artists to request custom works that match your vision.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                                <Heart className="text-accent" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payment</h3>
                            <p className="text-gray-600">Safe transactions via MoMo, VNPay, or Bank Transfer. Money back guarantee.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
