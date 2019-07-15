"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mutex {
    constructor() {
        this._resolves = null;
        this.locks = 0;
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
                this._resolves.push(resolve);
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
            this._resolves.shift()();
        }
    }
}
exports.default = Mutex;
