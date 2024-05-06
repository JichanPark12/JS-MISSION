import ClockController from './controllers/ClockController.js';

class AnalogClock {
  #clockController;

  constructor($container) {
    this.#clockController = new ClockController($container);
  }

  play() {
    this.#clockController.start();
  }
}

export default AnalogClock;
