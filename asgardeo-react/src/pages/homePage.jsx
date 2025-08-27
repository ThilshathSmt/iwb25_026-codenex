import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import Navbar from "../components/ui/Navbar"; 
import { ShieldAlert, Map, Ambulance, Building, ShieldCheck, Newspaper, MessageSquare, Camera, MapPin, NotebookText, HeartHandshake } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faSearch } from "@fortawesome/free-solid-svg-icons";

// Placeholder for a news/alerts component you might create later
const SafetyAlertsComponent = () => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-center text-gray-700">
                Latest safety alerts will be displayed here. (e.g., "High-traffic warning near City Center due to local festival.")
            </p>
        </div>
    );
};


const HomePage = () => {
    const { state, signIn } = useAuthContext();

    // Render this part of the page only if the user is authenticated
    const AuthenticatedView = () => (
        <main className="px-4">
            {/* Latest Safety Alerts Section */}
            <section className="mb-12 bg-white w-full text-black p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                    <Newspaper className="text-blue-600 mr-3" size={32} />
                    <h2 className="text-4xl font-bold text-gray-800">
                        Latest Safety Alerts
                    </h2>
                </div>
                <p className="text-lg mb-6 text-gray-600">
                    Stay informed about local conditions, safety advisories, and important updates for a secure trip.
                </p>
                <SafetyAlertsComponent />
            </section>

            {/* Incident Reporting Tool Section */}
            <section className="mb-16 bg-gray-100 w-full text-center py-12 rounded-lg">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
                    Report an Incident
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Your safety is our priority. If you witness or experience an incident, please report it. Your report can help keep other travelers safe.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Text Reports */}
                    <div className="p-6">
                        <MessageSquare className="text-yellow-500 h-10 w-10 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-800">Text Reports</h4>
                        <p className="text-gray-600">Submit detailed written accounts for accurate documentation.</p>
                    </div>
                    {/* Image Uploads */}
                    <div className="p-6">
                        <Camera className="text-blue-500 h-10 w-10 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-800">Image Uploads</h4>
                        <p className="text-gray-600">Upload photos to visually capture important moments and evidence.</p>
                    </div>
                    {/* Location Pinning */}
                    <div className="p-6">
                         <MapPin className="text-green-500 h-10 w-10 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-800">Location Pinning</h4>
                        <p className="text-gray-600">Share your location or the incident's location for a faster response.</p>
                    </div>
                </div>
                <div className="mt-10">
                    <Link to="/report" aria-label="Open Incident Reporting Tool">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                            Report an Incident Now
                        </button>
                    </Link>
                </div>
            </section>

            {/* Tourist Resource Locator Section */}
            <section className="mb-16 bg-white w-full text-center py-12">
                 <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
                    Tourist Resource Locator
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    Quickly find essential services near you. Our map connects you with hospitals, police stations, and embassies.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="p-6">
                        <Ambulance className="text-red-500 h-10 w-10 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-800">Medical Help</h4>
                        <p className="text-gray-600">Locate hospitals, clinics, and emergency medical services.</p>
                    </div>
                    <div className="p-6">
                        <ShieldCheck className="text-blue-800 h-10 w-10 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-800">Police Stations</h4>
                        <p className="text-gray-600">Find the nearest police stations for assistance and reporting.</p>
                    </div>
                    <div className="p-6">
                        <Building className="text-gray-600 h-10 w-10 mx-auto mb-4" />
                        <h4 className="text-xl font-semibold text-gray-800">Embassies</h4>
                        <p className="text-gray-600">Get contact information and directions to your country's embassy.</p>
                    </div>
                </div>
                 <div className="mt-10">
                    <Link to="/map" aria-label="Open Resource Locator">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                            Open Interactive Map
                        </button>
                    </Link>
                </div>
            </section>
            
            {/* Travel Safety Tips Section */}
            <section className="bg-gray-100 py-16 rounded-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Travel Safety Tips</h2>
                    <p className="text-lg text-gray-600 mb-12 text-center">A little preparation goes a long way. Follow these tips for a safe and enjoyable journey.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <NotebookText className="h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold text-blue-600 mb-2">Plan Your Itinerary</h3>
                            <p className="text-gray-600">Share your travel plans with family or friends and check travel advisories for your destination.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                           <ShieldCheck className="h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold text-blue-600 mb-2">Secure Your Valuables</h3>
                            <p className="text-gray-600">Keep important documents and valuables in a secure location. Avoid displaying expensive items.</p>
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                           <HeartHandshake className="h-12 w-12 text-blue-600 mb-4" />
                            <h3 className="text-xl font-semibold text-blue-600 mb-2">Respect Local Customs</h3>
                            <p className="text-gray-600">Learn about local laws and customs to show respect and avoid misunderstandings.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            <header className="flex justify-center p-4 bg-white rounded-lg mt-4">
                <div className="flex justify-center space-x-4">
                    <Link to="/emergency-contacts" aria-label="Emergency Contacts">
                        <button className="flex items-center bg-red-600 hover:bg-red-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300">
                            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                            SOS
                        </button>
                    </Link>
                    <Link to="/map" aria-label="Find Safe Places">
                        <button className="flex items-center bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300">
                            <FontAwesomeIcon icon={faSearch} className="mr-2" />
                            Find Safe Places
                        </button>
                    </Link>
                </div>
            </header>
            
            {state.isAuthenticated ? (
                <AuthenticatedView />
            ) : (
                <div className="text-center p-16">
                     <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome to SafePath</h2>
                     <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Your trusted companion for a safe and secure travel experience. Please log in to access safety alerts, resource maps, and incident reporting tools.
                     </p>
                     <button 
                        onClick={() => signIn()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                     >
                        Login / Sign Up
                    </button>
                </div>
            )}

            <footer className="bg-gray-800 text-white py-8 text-center mt-16">
                <p>&copy; 2025 SafePath. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;