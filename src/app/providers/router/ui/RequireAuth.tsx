import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getRouteForbidden, getRouteMain } from '../../../../shared/const/router';

import { Role, getRoles, getUserAuthData } from '@/entities/User';

interface RequireAuthProps {
  children: JSX.Element;
  roles?: Role[];
}

export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const location = useLocation();
  const isAuth = useSelector(getUserAuthData);
  const userRoles = useSelector(getRoles);

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }

    return roles.some((requireRole) => {
      const hasRole = userRoles?.includes(requireRole);
      return hasRole;
    });
  }, [roles, userRoles]);

  if (!isAuth) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
  }

  return children;
};
