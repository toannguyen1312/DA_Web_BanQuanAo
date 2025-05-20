// src/pages/Admin/RequireAdminAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
function RequireAdminAuth({ children }) {

    const token = useSelector(state =>state.auth.token)
    // Giả sử bạn lưu token ở localStorage hoặc redux
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return children;
}

export default RequireAdminAuth;