import useScreenType from 'react-screentype-hook';
import { SCREEN_BREAK_POINTS } from '@app/utils/constants';

export default function useMedia() {
  return useScreenType({
    mobile: SCREEN_BREAK_POINTS.mobile,
    tablet: SCREEN_BREAK_POINTS.tablet,
    desktop: SCREEN_BREAK_POINTS.desktop,
    largeDesktop: SCREEN_BREAK_POINTS.largeDesktop
  });
}
