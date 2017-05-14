export default class Stone {
  constructor(obj = {}) {
    this.subscriber = [];
    this.state = { ...{}, ...obj };

    Object.defineProperty(this, 'state', {
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(this, 'subscriber', {
      enumerable: false,
      configurable: false
    });
    Object.defineProperty(this, 'length', {
      configurable: true,
      enumerable: false,
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
        configurable: true,
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
    func.__id__ = Math.random().toFixed(5);
    this.subscriber.push(func);
    return () => {
      const index = this.subscriber.findIndex(handler => {
        return handler.__id__ && handler.__id__ === func.__id__;
      });
      if (index >= 0) {
        this.subscriber.splice(index, 1);
      }
    };
  }

  watch(key, callback) {
    return this.subscribe((_key, oldValue, newValue) => {
      if (key === _key) {
        callback.call(this, oldValue, newValue);
      }
    });
  }

  // Object method
  keys() {
    return Object.keys(this.state);
  }

  values() {
    let values = [];
    for (let key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        values.push(this.state[key]);
      }
    }
    return values;
  }

  toString() {
    return this.state.toString();
  }

  stringify() {
    return JSON.stringify(this.state);
  }
}
