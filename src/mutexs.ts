

type WAIT_ONE = 1;
const WAIT_ONE = 1;

export default class Mutexs {

  locks: {
    [key: string]: Function[] | Function | undefined | WAIT_ONE;
  } = {};

  async lock(key: string | number) {
    const lock = this.locks[key];
    if (lock == null) {
      this.locks[key] = WAIT_ONE;
    } else if (lock === WAIT_ONE) {
      await new Promise((resolve, _reject) => {
        this.locks[key] = resolve;
      });
    } else if (lock instanceof Function) {
      await new Promise((resolve, _reject) => {
        this.locks[key] = [lock, resolve];
      });
    } else {
      await new Promise((resolve, _reject) => {
        (<Function[]>lock).push(resolve);
      });
    }
  }

  free(key: string | number) {
    const lock = this.locks[key];
    if (lock instanceof Function) {
      delete this.locks[key];
      lock();
    } else if (lock instanceof Array) {
      const n = lock.shift();
      if (n != null) {
        n();
      }
      if (lock.length <= 0) {
        delete this.locks[key];
      }
    } else {
      delete this.locks[key];
    }
  }
}
