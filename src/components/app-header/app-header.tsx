import { AppHeaderUI } from '@ui';

import { useSelector } from '@services/store';

import { getUserSelector } from '../../services/slices/userSlice';

export const AppHeader = (): React.JSX.Element => {
  /* TODO: Получите имя пользователя из хранилища */
  const userName = useSelector(getUserSelector)?.name;

  return <AppHeaderUI userName={userName} />;
};
