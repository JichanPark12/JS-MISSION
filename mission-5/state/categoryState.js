class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observerToRemove) {
    this.observers = this.observers.filter((fn) => fn !== observerToRemove);
  }

  notify(value) {
    this.observers.forEach((observer) => {
      observer.update(value);
    });
  }
}

export const subject = new Observer();

export const categoryProxy = new Proxy(
  { category: 'all' },
  {
    set(target, key, value) {
      Reflect.set(target, key, value);
      subject.notify({ actions: 'changeCategory' });
      return true;
    },
  }
);
