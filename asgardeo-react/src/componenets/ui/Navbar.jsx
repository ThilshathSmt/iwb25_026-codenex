import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import { ShieldCheck, Menu, X, Bell, Newspaper } from "lucide-react";

// Placeholder for a dropdown/slider that could show notifications
const AlertSlider = ({ isOpen, toggleAlertSlider }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-full right-4 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <button onClick={toggleAlertSlider} className="text-gray-500 hover:text-gray-800">
                    <X size={20} />
                </button>
            </div>
            <div className="p-4">
                <p className="text-center text-gray-600">You have no new notifications.</p>
                {/* Future notifications would be listed here */}
            </div>
        </div>
    );
};


const Navbar = () => {
    const { state, signIn, signOut, getBasicUserInfo } = useAuthContext();
    const [userRoles, setUserRoles] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    
    // Dummy alerts for the ticker, as there's no backend for this yet
    const safetyAlerts = [
        { text: "Tip: Always be aware of your surroundings in crowded places.", url: "#" },
        { text: "Alert: Increased security in downtown area today.", url: "#" },
        { text: "Info: Local festival scheduled for this weekend. Expect traffic.", url: "#" },
    ];
    const [currentAlertIndex, setCurrentAlertIndex] = useState(0);

    const location = useLocation();

    // Fetch user roles when authenticated
    useEffect(() => {
        if (state.isAuthenticated) {
            getBasicUserInfo()
                .then((info) => {
                    setUserRoles(info.groups || []); 
                })
                .catch((error) => {
                    console.error("Failed to get user info:", error);
                });
        }
    }, [state.isAuthenticated, getBasicUserInfo]);
    
    // Cycle through the safety alerts for the top bar
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentAlertIndex(prevIndex => (prevIndex + 1) % safetyAlerts.length);
        }, 8000); // Change alert every 8 seconds
        return () => clearInterval(intervalId);
    }, [safetyAlerts.length]);

    const isAdmin = userRoles.includes("admin");

    const isActivePage = (path) => location.pathname === path;

    const navLinkStyles = (path) => `
        block mt-4 lg:inline-block lg:mt-0 
        text-blue-600 hover:text-white hover:bg-blue-600 
        px-3 py-2 rounded-md mr-4 transition-colors duration-300
        ${isActivePage(path) ? "font-bold" : ""}
    `;

    return (
        <div>
            {/* Safety Alerts Ticker Bar */}
            <div className="w-full py-2 px-4 text-center bg-yellow-400 text-yellow-900">
                <div className="flex items-center justify-center">
                    <Newspaper className="mr-2" size={20} />
                    <a href={safetyAlerts[currentAlertIndex].url} className="hover:underline">
                        {safetyAlerts[currentAlertIndex].text}
                    </a>
                </div>
            </div>

            <nav className="flex items-center justify-between flex-wrap bg-white p-6 px-4 shadow-md relative">
                {/* Logo Section */}
                <div className="flex items-center flex-shrink-0 text-blue-600 ml-4 lg:ml-20">
                    <ShieldCheck className="h-8 w-8 mr-2" />
                    <Link to="/" className="font-semibold text-xl tracking-tight">
                        SafePath
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="block lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center px-3 py-2 border rounded text-blue-500 border-blue-500 hover:text-blue-800 hover:border-blue-800"
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Navigation Links and Auth Buttons */}
                <div className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${isMenuOpen ? "block" : "hidden"}`}>
                    <div className="text-sm lg:flex-grow lg:text-center">
                        <Link to="/" className={navLinkStyles("/")}>Homepage</Link>
                        <Link to="/map" className={navLinkStyles("/map")}>Interactive Map</Link>
                        <Link to="/report" className={navLinkStyles("/report")}>Report Incident</Link>
                         {/* Admin-only link */}
                        {isAdmin && (
                            <Link to="/admin-dashboard" className={navLinkStyles("/admin-dashboard")}>
                                Admin Dashboard
                            </Link>
                        )}
                    </div>

                    <div className="mt-4 lg:mt-0 flex items-center">
                        {state?.isAuthenticated ? (
                            <button
                                onClick={() => signOut()}
                                className="inline-block px-6 py-2 leading-none border rounded text-white bg-blue-600 border-blue-600 hover:bg-blue-700 mr-4"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => signIn()}
                                className="inline-block px-4 py-2 leading-none border rounded text-blue-600 border-blue-500 hover:text-white hover:bg-blue-600"
                            >
                                Login / Signup
                            </button>
                        )}
                        {/* Bell Icon */}
                        <button
                            onClick={() => setIsAlertOpen(!isAlertOpen)}
                            className="text-blue-600 hover:text-blue-800 ml-2"
                        >
                            <Bell size={24} />
                        </button>
                    </div>
                </div>

                {/* Alert Slider Component */}
                <AlertSlider isOpen={isAlertOpen} toggleAlertSlider={() => setIsAlertOpen(!isAlertOpen)} />
            </nav>
        </div>
    );
};

export default Navbar;