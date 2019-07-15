export default class Mutex {
    private _resolves;
    locks: number;
    constructor();
    lock(): Promise<void>;
    isLock(): boolean;
    free(): void;
}
