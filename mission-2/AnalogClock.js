import CLOCK_TEMPLATE from './template/clock.js';
import setClockHandRotation from './utils.js/clockUtil.js';

const AnalogClock = ($container) => {
  // do something!

  $container.innerHTML = CLOCK_TEMPLATE;

  const $SECOND = $container.querySelector('.second');
  const $MINUTE = $container.querySelector('.minute');
  const $HOUR = $container.querySelector('.hour');

  const updateClock = () => {
    const NEW_DATE = new Date();
    const SECONDS = NEW_DATE.getSeconds();
    const MINUTES = NEW_DATE.getMinutes();
    const HOURS = NEW_DATE.getHours();

    const SECOND_DEG = (SECONDS / 60) * 360;
    const MINUTE_DEG = ((MINUTES + SECONDS / 60) / 60) * 360;
    const HOUR_DEG = (((HOURS % 12) + MINUTE_DEG / 360) / 12) * 360;

    setClockHandRotation($SECOND, SECOND_DEG);
    setClockHandRotation($MINUTE, MINUTE_DEG);
    setClockHandRotation($HOUR, HOUR_DEG);
  };

  updateClock();
  setInterval(() => {
    updateClock();
  }, 1000);
};

export default AnalogClock;
