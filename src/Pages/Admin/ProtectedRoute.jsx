import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; 
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = useSelector(state =>state.auth.token)
    const decoded = jwtDecode(token);
    const scopes = decoded.scope ? decoded.scope.split(' ') : [];
    const hasRoleUser = scopes.includes('ROLE_ADMIN');


    if (!hasRoleUser) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
}

export default ProtectedRoute;
