"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function sleep(interval) {
    return new Promise((resolve, _reject) => {
        setTimeout(resolve, interval);
    });
}
exports.sleep = sleep;
const mutex_1 = require("./mutex");
exports.Mutex = mutex_1.default;
const mutexs_1 = require("./mutexs");
exports.Mutexs = mutexs_1.default;
