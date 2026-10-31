import { ConstructorPageUI } from '@ui-pages';

import { useSelector } from '@services/store';

import { getIngredientsLoading } from '../../services/slices/ingredientsSlice';

export const ConstructorPage = (): React.JSX.Element => {
  const isIngredientsLoading = useSelector(getIngredientsLoading);

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};
