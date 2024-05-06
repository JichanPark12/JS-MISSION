import ClockModel from '../models/ClockModel.js';
import ClockView from '../views/ClockView.js';

class ClockController {
  #clockView;

  constructor($container) {
    this.#clockView = new ClockView($container);
  }

  start() {
    this.init();
    this.runClock();
  }

  init() {
    this.#clockView.initRender();
    this.#clockView.setHandElements();
  }

  runClock() {
    this.#clockView.updateClock(ClockModel.getCurrentTime());
    setInterval(() => {
      this.#clockView.updateClock(ClockModel.getCurrentTime());
    }, 1000);
  }
}

export default ClockController;
