class Stone {
  constructor(obj) {
    this.subscriber = [];
    this.state = { ...{}, ...obj };
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
          console.log(new Error(`can't set value for ${key}, please use .set`));
        }
      });
    }
    if (oldValue !== value) {
      this.subscriber.forEach(func => {
        func.call(this, key, oldValue, value);
      });
    }
  }

  remove(key) {
    delete this.state[key];
    if (this.hasOwnProperty(key)) {
      delete this[key];
    }
  }

  subscribe(func) {
    this.subscriber.push(func);
  }

  // Object method
  keys() {
    return Object.keys(this.state);
  }

  values() {
    return Object.values(this.state);
  }

  entries() {}

  toString() {
    return this.state.toString();
  }

  get length() {
    return this.keys().length;
  }
}