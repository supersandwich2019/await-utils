declare type WAIT_ONE = 1;
declare const WAIT_ONE = 1;
export default class Mutexs {
    locks: {
        [key: string]: Function[] | Function | undefined | WAIT_ONE;
    };
    lock(key: string | number): Promise<void>;
    free(key: string | number): void;
}
export {};
