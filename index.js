export default class Stone {
  constructor(obj = {}) {
    this.subscriber = [];
    this.state = { ...{}, ...obj };

    Object.defineProperty(this, 'state', { enumerable: false });
    Object.defineProperty(this, 'subscriber', { enumerable: false });
    Object.defineProperty(this, 'length', {
      enumerable: false,
      configurable: false,
      get() {
        return this.keys().length;
      }
    });

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        this.set(key, obj[key]);
      }
    }
  }

  // 自实现的方法
  set(key, value) {
    const oldValue = this[key];
    this.state = { ...this.state, ...{ [key]: value } };

    if (!Object.getOwnPropertyDescriptor(this, key)) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: false,
        get() {
          return this.state[key];
        },
        set(value) {
          throw new Error(`can't set value for ${key}, please use .set`);
        }
      });
    }
    if (oldValue !== value) {
      this.subscriber.forEach(func => {
        func.call(this, key, oldValue, value);
      });
    }
    return this;
  }

  remove(key) {
    delete this.state[key];
    if (this.hasOwnProperty(key)) {
      delete this[key];
    }
    return this;
  }

  subscribe(func) {
    this.subscriber.push(func);
    return this;
  }

  // Object method
  keys() {
    return Object.keys(this.state);
  }

  values() {
    return Object.values(this.state);
  }

  toString() {
    return this.state.toString();
  }
}
