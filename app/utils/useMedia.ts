import useScreenType from 'react-screentype-hook';
import { screenBreakPoints } from '@themes/media';

export default function useMedia() {
  return useScreenType({
    mobile: screenBreakPoints.MOBILE,
    tablet: screenBreakPoints.TABLET,
    desktop: screenBreakPoints.DESKTOP,
    largeDesktop: screenBreakPoints.LARGE_DESKTOP
  });
}
