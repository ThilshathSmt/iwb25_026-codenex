import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import InteractiveMapPage from './pages/InteractiveMapPage'; // Placeholder page
import ReportIncidentPage from './pages/ReportIncidentPage'; // Placeholder page
import AdminDashboardPage from './pages/AdminDashboardPage'; // Placeholder page
import EmergencyContactsPage from './pages/EmergencyContactsPage'; // Placeholder page

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<InteractiveMapPage />} />
      <Route path="/report" element={<ReportIncidentPage />} />
      <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
      <Route path="/emergency-contacts" element={<EmergencyContactsPage />} />
    </Routes>
  );
};

export default AppRouter;