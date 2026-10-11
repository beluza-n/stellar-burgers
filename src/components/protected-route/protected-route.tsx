import { Preloader } from '@ui';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useSelector } from '@services/store';

import { getIsAuthChecked, getUserSelector } from '../../services/slices/userSlice';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
}: TProtectedRouteProps): React.JSX.Element => {
  // TODO: user, isAuthChecked / isLoading из стора
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUserSelector);
  const location = useLocation();

  // TODO: if (!isAuthChecked) return <Preloader />
  if (!isAuthChecked) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // TODO: если юзера нет — Navigate на /login
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // TODO: если user есть — Navigate на главную или from
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return <Outlet />;
};
