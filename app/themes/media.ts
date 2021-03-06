import { generateMedia } from 'styled-media-query';

export const screenBreakPoints = {
  MOBILE: 390,
  TABLET: 768,
  DESKTOP: 992,
  LARGE_DESKTOP: 1400
};

const media = generateMedia({
  mobile: `${screenBreakPoints.MOBILE / 16}em`,
  tablet: `${screenBreakPoints.TABLET / 16}em`,
  desktop: `${screenBreakPoints.DESKTOP / 16}em`
});

export default media;
