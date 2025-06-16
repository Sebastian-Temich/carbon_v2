import { Navigate, useLocation } from 'react-router-dom';

import { AccessDenied } from '@screens/access-denied/access-denied';
import userStore from '@store/user-store';
import { ROLES } from '@utils/roles';
import { ROUTES } from '@utils/routes';

export const ProtectedRoute = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles: Array<ROLES>;
}) => {
  const { user } = userStore;
  const location = useLocation();

  const userHasRequiredRole = user && roles.includes(user.roles[0].name);

  if (!user) {
    return <Navigate to={ROUTES.Login.path} state={{ from: location }} />;
  }

  if (user && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return children;
};
