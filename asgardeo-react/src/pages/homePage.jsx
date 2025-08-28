import React, { useEffect, useRef, useState } from "react";
import { MapPin, Upload, Info, Newspaper, AlertTriangle } from "lucide-react";
import Navbar from "../components/ui/Navbar";
import NewsComponent from "../components/newsComponent";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExclamationCircle,
    faSearch,
    faLifeRing,
    faMicrophone,
    faCamera,
    faFileAlt,
    faMedkit,
    faHome,
    faUtensils,
    faFirstAid,
    faNewspaper,
    faMapMarkedAlt,
    faFolderOpen,
    faHeart,
    faGlobe,
    faRoute,
    faComments,
    faStar
} from "@fortawesome/free-solid-svg-icons";

// Import your attraction image
import attractionImage from "../assets/Attraction.jpg";

// Animation component for fade-in effect
const FadeInSection = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            });
        });

        const { current } = domRef;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, [delay]);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-700 ease-out ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
            }`}
        >
            {children}
        </div>
    );
};

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section with Attraction Background - Adjusted to show lower part */}
            <div 
                className="relative h-96 bg-cover bg-center bg-fixed flex items-center justify-center"
                style={{ 
                    backgroundImage: `url(${attractionImage})`,
                    backgroundPosition: "center 170%" // Show lower part of the image
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <FadeInSection>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            Explore Safely with SafePath
                        </h1>
                    </FadeInSection>
                    <FadeInSection delay={200}>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            Your trusted companion for safe travel adventures around the world
                        </p>
                    </FadeInSection>
                    <FadeInSection delay={400}>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link to="/ResourceLocator">
                                <button className="bg-[#28a745] hover:bg-[#218838] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                                    Discover Safe Places
                                </button>
                            </Link>
                            <Link to="/EmergencyContacts">
                                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                                    Emergency SOS
                                </button>
                            </Link>
                        </div>
                    </FadeInSection>
                </div>
            </div>

            <main className="px-4 relative z-20">
                {/* Travel Safety Updates Section */}
                <section className="mb-16 bg-white w-full rounded-lg shadow-md p-8 mt-8">
                    <FadeInSection delay={100}>
                        <div className="flex items-center mb-4">
                            <Newspaper className="text-gray-700 mr-2" />
                            <h2 className="text-4xl font-bold">
                                Travel Safety Updates
                            </h2>
                        </div>
                        <p className="text-lg mb-6 text-gray-600">
                            Stay informed about current safety conditions, weather alerts, 
                            and travel advisories for your destination.
                        </p>
                    </FadeInSection>
                    <FadeInSection delay={200}>
                        <NewsComponent />
                    </FadeInSection>
                </section>

                {/* Tourist Safety Features Section */}
                <section className="mb-16 bg-gray-50 w-full rounded-lg shadow-md py-12 px-8">
                    <FadeInSection delay={100}>
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                            Your Complete Travel Safety Solution
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 text-center">
                            SafePath provides everything you need to explore unfamiliar destinations with confidence and security:
                        </p>
                    </FadeInSection>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Safe Routes */}
                        <FadeInSection delay={200}>
                            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center justify-center mb-4">
                                    <FontAwesomeIcon
                                        icon={faRoute}
                                        className="text-[#28a745] h-8 w-8 mr-3"
                                    />
                                    <h4 className="text-xl font-semibold text-gray-800">
                                        Safe Route Planning
                                    </h4>
                                </div>
                                <p className="text-gray-600">
                                    Get optimized routes that avoid high-risk areas and consider current conditions.
                                </p>
                            </div>
                        </FadeInSection>
                        
                        {/* Multi-language */}
                        <FadeInSection delay={300}>
                            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center justify-center mb-4">
                                    <FontAwesomeIcon
                                        icon={faComments}
                                        className="text-[#28a745] h-8 w-8 mr-3"
                                    />
                                    <h4 className="text-xl font-semibold text-gray-800">
                                        Multi-language Support
                                    </h4>
                                </div>
                                <p className="text-gray-600">
                                    Communicate easily with locals and responders using our translation tools.
                                </p>
                            </div>
                        </FadeInSection>
                        
                        {/* Incident Reporting */}
                        <FadeInSection delay={400}>
                            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center justify-center mb-4">
                                    <FontAwesomeIcon
                                        icon={faFileAlt}
                                        className="text-[#28a745] h-8 w-8 mr-3"
                                    />
                                    <h4 className="text-xl font-semibold text-gray-800">
                                        Incident Reporting
                                    </h4>
                                </div>
                                <p className="text-gray-600">
                                    Report safety concerns to help other travelers and local authorities.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                    
                    <FadeInSection delay={500}>
                        <div className="mt-10 text-center">
                            <Link
                                to="/Documentation"
                                aria-label="Explore Safety Features"
                            >
                                <button className="bg-[#28a745] hover:bg-[#218838] text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                                    Explore Safety Features
                                </button>
                            </Link>
                        </div>
                    </FadeInSection>
                </section>

                {/* Travel Resource Locator Section */}
                <section className="mb-16 bg-white w-full rounded-lg shadow-md py-12 px-8">
                    <FadeInSection delay={100}>
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                            Essential Travel Resources
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 text-center">
                            Quickly find important services and facilities during your travels:
                        </p>
                    </FadeInSection>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Medical Help */}
                        <FadeInSection delay={200}>
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center justify-center mb-4">
                                    <FontAwesomeIcon
                                        icon={faMedkit}
                                        className="text-red-500 h-8 w-8 mr-3"
                                    />
                                    <h4 className="text-xl font-semibold text-gray-800">
                                        Medical Facilities
                                    </h4>
                                </div>
                                <p className="text-gray-600">
                                    Locate hospitals, clinics, and pharmacies near your location.
                                </p>
                            </div>
                        </FadeInSection>
                        
                        {/* Food & Accommodation */}
                        <FadeInSection delay={300}>
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center justify-center mb-4">
                                    <FontAwesomeIcon
                                        icon={faUtensils}
                                        className="text-orange-500 h-8 w-8 mr-3"
                                    />
                                    <h4 className="text-xl font-semibold text-gray-800">
                                        Food & Accommodation
                                    </h4>
                                </div>
                                <p className="text-gray-600">
                                    Find safe restaurants, hotels, and recommended lodging options.
                                </p>
                            </div>
                        </FadeInSection>
                        
                        {/* Emergency Services */}
                        <FadeInSection delay={400}>
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center justify-center mb-4">
                                    <FontAwesomeIcon
                                        icon={faHome}
                                        className="text-purple-500 h-8 w-8 mr-3"
                                    />
                                    <h4 className="text-xl font-semibold text-gray-800">
                                        Emergency Services
                                    </h4>
                                </div>
                                <p className="text-gray-600">
                                    Locate police stations, embassies, and emergency shelters.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                    
                    <FadeInSection delay={500}>
                        <div className="mt-10 text-center">
                            <Link
                                to="/ResourceLocator"
                                aria-label="Find Travel Resources"
                            >
                                <button className="bg-[#28a745] hover:bg-[#218838] text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                                    Find Travel Resources
                                </button>
                            </Link>
                        </div>
                    </FadeInSection>
                </section>

                {/* Travel Safety Tips Section */}
                <section className="bg-gray-50 py-16 rounded-lg shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeInSection delay={100}>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                                Travel Safety Tips
                            </h2>
                            <p className="text-lg text-gray-600 mb-12 text-center">
                                Stay safe while exploring new destinations with these essential travel tips.
                            </p>
                        </FadeInSection>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {/* Card 1 */}
                            <FadeInSection delay={200}>
                                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <FontAwesomeIcon
                                            icon={faFirstAid}
                                            className="h-10 w-10 text-[#28a745]"
                                        />
                                        <h3 className="text-xl font-semibold text-[#28a745]">
                                            Travel Health Kit
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        Always carry essential medications, first aid supplies, and health documents.
                                    </p>
                                </div>
                            </FadeInSection>

                            {/* Card 2 */}
                            <FadeInSection delay={300}>
                                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <FontAwesomeIcon
                                            icon={faGlobe}
                                            className="h-10 w-10 text-[#28a745]"
                                        />
                                        <h3 className="text-xl font-semibold text-[#28a745]">
                                            Local Awareness
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        Research local customs, laws, and potential risks before you arrive.
                                    </p>
                                </div>
                            </FadeInSection>

                            {/* Card 3 */}
                            <FadeInSection delay={400}>
                                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <FontAwesomeIcon
                                            icon={faNewspaper}
                                            className="h-10 w-10 text-[#28a745]"
                                        />
                                        <h3 className="text-xl font-semibold text-[#28a745]">
                                            Stay Informed
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        Monitor local news, weather forecasts, and travel advisories regularly.
                                    </p>
                                </div>
                            </FadeInSection>

                            {/* Card 4 */}
                            <FadeInSection delay={500}>
                                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <FontAwesomeIcon
                                            icon={faMapMarkedAlt}
                                            className="h-10 w-10 text-[#28a745]"
                                        />
                                        <h3 className="text-xl font-semibold text-[#28a745]">
                                            Navigation Planning
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        Plan your routes in advance and share your itinerary with trusted contacts.
                                    </p>
                                </div>
                            </FadeInSection>

                            {/* Card 5 */}
                            <FadeInSection delay={600}>
                                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <FontAwesomeIcon
                                            icon={faFolderOpen}
                                            className="h-10 w-10 text-[#28a745]"
                                        />
                                        <h3 className="text-xl font-semibold text-[#28a745]">
                                            Document Safety
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        Keep digital and physical copies of important travel documents secure.
                                    </p>
                                </div>
                            </FadeInSection>

                            {/* Card 6 */}
                            <FadeInSection delay={700}>
                                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className="h-10 w-10 text-[#28a745]"
                                        />
                                        <h3 className="text-xl font-semibold text-[#28a745]">
                                            Review Places
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        Share your experiences and rate locations to help fellow travelers.
                                    </p>
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white py-8 text-center mt-16">
                <p>&copy; 2025 SafePath. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;