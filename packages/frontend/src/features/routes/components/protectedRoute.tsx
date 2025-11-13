import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { type RootState } from '../../../store/store';
import type { ProtectedRouteProps } from '../types/protectedRouteProps.type';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  requiredPermissions = [],
  isPublic
}) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isPublic && (!isAuthenticated || !user)) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check roles
  if (!isPublic && requiredRoles.length > 0) {
    const userRoles = user?.userRoles.map(ur => ur.role.name);
    const hasRequiredRole = requiredRoles.some(role => userRoles?.includes(role));

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Note: For permissions, we would need to decode the JWT token
  // or fetch user permissions from the API since they're not stored in the user object
  // This is a simplified version - in a real app, you'd want to handle permissions properly

  return <>{children}</>;
};

export default ProtectedRoute;
