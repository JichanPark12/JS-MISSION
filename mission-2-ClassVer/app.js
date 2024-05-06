import AnalogClock from './AnalogClock.js';

document.querySelectorAll('.analog-clock').forEach(($container) => {
  const analogClock = new AnalogClock($container);
  analogClock.play();
});
