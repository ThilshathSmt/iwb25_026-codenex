import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import axios from "axios";

// This component now accepts a `requiredRole` prop
const PrivateRoute = ({ children, requiredRole }) => {
  const { state, signIn, getIDToken } = useAuthContext();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const validateToken = async () => {
      try {
        const idToken = await getIDToken();
        console.log('ID Token:', idToken);

        if (!idToken) {
          throw new Error("No ID token available");
        }

        // Determine which backend endpoint to call based on the required role
        let endpoint = '';
        switch(requiredRole) {
          case 'admin':
            endpoint = 'http://localhost:8050/api/admin';
            break;
          case 'responder':
            endpoint = 'http://localhost:8050/api/responder';
            break;
          case 'tourist':
            endpoint = 'http://localhost:8050/api/tourist';
            break;
          default:
            // For routes that don't require a specific role but just authentication
            endpoint = 'http://localhost:8050/api/validate';
        }

        console.log(`Validating against endpoint: ${endpoint} for role: ${requiredRole}`);

        // Validate the ID token with the backend for the specific role
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response.status === 200) {
          setIsAuthorized(true);  // Token validation successful
          setError('');
        }
      } catch (error) {
        console.error('Authorization failed', error);
        setIsAuthorized(false);
        setError(`You are not authorized to view this page. Required role: ${requiredRole || 'Authenticated User'}`);
      } finally {
        setLoading(false);
      }
    };

    if (state.isAuthenticated) {
      validateToken();
    } else {
      signIn();
      setLoading(false);
    }
  }, [getIDToken, signIn, state.isAuthenticated, requiredRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!state.isAuthenticated || !isAuthorized) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl font-semibold">{error}</div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;