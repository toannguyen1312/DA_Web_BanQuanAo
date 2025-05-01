import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

    if (!isLoggedIn) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
