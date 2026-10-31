import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import type { TAppHeaderUIProps } from './type';

import styles from './app-header.module.css';

const getLinkClass = ({ isActive }: { isActive: boolean }): string =>
  isActive ? `${styles.link} ${styles.link_active}` : styles.link;

const getIconType = (isActive: boolean): 'primary' | 'secondary' =>
  isActive ? 'primary' : 'secondary';

export const AppHeaderUI = ({ userName }: TAppHeaderUIProps): React.JSX.Element => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to="/" end className={getLinkClass}>
          {({ isActive }) => (
            <>
              <BurgerIcon type={getIconType(isActive)} />
              <p className="text text_type_main-default ml-2 mr-10">Конструктор</p>
            </>
          )}
        </NavLink>
        <NavLink to="/feed" className={getLinkClass}>
          {({ isActive }) => (
            <>
              <ListIcon type={getIconType(isActive)} />
              <p className="text text_type_main-default ml-2">Лента заказов</p>
            </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <NavLink to="/">
          <Logo className="" />
        </NavLink>
      </div>
      <div className={styles.link_position_last}>
        <NavLink to="/profile" className={getLinkClass}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={getIconType(isActive)} />
              <p className="text text_type_main-default ml-2">
                {userName ?? 'Личный кабинет'}
              </p>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
