import CLOCK_TEMPLATE from '../template/clock.js';
import setClockHandRotation from '../utils.js/clockUtil.js';

class ClockView {
  #$container;

  #handElements;

  constructor($container) {
    this.#$container = $container;
  }

  initRender() {
    this.#$container.innerHTML = CLOCK_TEMPLATE;
  }

  setHandElements() {
    const $second = this.#$container.querySelector('.second');
    const $minute = this.#$container.querySelector('.minute');
    const $hour = this.#$container.querySelector('.hour');

    this.#handElements = { $hour, $minute, $second };
  }

  updateClock(currentTime) {
    const { hours, minutes, seconds } = currentTime;
    const { $hour, $minute, $second } = this.#handElements;

    const SECOND_DEG = seconds * 6;
    const MINUTE_DEG = minutes * 6 + seconds * 0.1;
    const HOUR_DEG = ((hours % 12) + MINUTE_DEG / 360) * 30;

    setClockHandRotation($second, SECOND_DEG);
    setClockHandRotation($minute, MINUTE_DEG);
    setClockHandRotation($hour, HOUR_DEG);
  }
}

export default ClockView;
