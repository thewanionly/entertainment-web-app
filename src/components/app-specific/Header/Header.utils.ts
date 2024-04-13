import { VerticalClassKey, verticalClasses } from './Header.constants';
import { HeaderOrientation } from './Header.types';

export const getVerticalClasses = (
  orientation: HeaderOrientation | undefined,
  name: VerticalClassKey
) => {
  if (orientation === 'vertical') return verticalClasses[name].default;

  if (!orientation) return verticalClasses[name].md;

  return '';
};
