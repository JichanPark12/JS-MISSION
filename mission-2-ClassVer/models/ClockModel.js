class ClockModel {
  static getCurrentTime() {
    const date = new Date();
    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    };
  }
}

export default ClockModel;
