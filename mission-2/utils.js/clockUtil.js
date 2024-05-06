import STYLE_CLASS_CONFIG from '../constants/config.js';

const setClockHandRotation = ($hand, degrees) => {
  $hand.style.setProperty(STYLE_CLASS_CONFIG.clockRotationName, degrees);
};

export default setClockHandRotation;
