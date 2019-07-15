export default class Mutex {
  private _resolves: Function[] | null = null;
  public locks = 0;

  constructor() {
    // console.log("new DataLock");
  }
  async lock() {
    // console.log("lockData ", this.locks + 1);
    this.locks++;
    if (this.locks > 1) {
      if (this._resolves == null) {
        this._resolves = [];
      }
      await new Promise((resolve, _reject) => {
        this._resolves!.push(resolve);
      });
    }
  }

  isLock() {
    return this.locks > 0;
  }


  free() {
    // console.log("freeData ", this.locks - 1);
    this.locks--;
    if (this._resolves != null && this._resolves.length > 0) {
      this._resolves.shift()!();
    }
  }
}
