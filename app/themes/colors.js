/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#000000';
const text = '#212529';
const secondaryText = '#FFFFFF';
const secondary = '#b0b0b0';
const success = '#28a745';
const error = '#dc3545';
const gotoStories = '#1890ff';
const cardBg = '#d8d8d8';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
  secondary,
  success,
  error,
  secondaryText,
  gotoStories,
  cardBg,
  theme: {
    lightMode: {
      primary,
      secondary
    },
    darkMode: {
      primary: secondary,
      secondary: primary
    }
  }
};
module.exports = colors;
