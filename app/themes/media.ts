import { SCREEN_BREAK_POINTS } from '@utils/constants';

export const media = {
  mobile: `${SCREEN_BREAK_POINTS.mobile / 16}em`,
  tablet: `${SCREEN_BREAK_POINTS.tablet / 16}em`,
  desktop: `${SCREEN_BREAK_POINTS.desktop / 16}em`,
  largeDesktop: `${SCREEN_BREAK_POINTS.largeDesktop / 16}em`
};

export default media;
