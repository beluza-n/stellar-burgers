import { Outlet } from 'react-router-dom';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

// см. пример как в задании про logout: Outlet + позже Navigate и згрузка
export const ProtectedRoute = ({
  onlyUnAuth = false,
}: TProtectedRouteProps): React.JSX.Element => {
  // TODO: user, isAuthChecked / isLoading из стора
  // TODO: if (!isAuthChecked) return <Preloader />

  if (onlyUnAuth) {
    // TODO: если user есть — Navigate на главную или from
  } else {
    // TODO: если юзера нет — Navigate на /login
  }

  return <Outlet />;
};
