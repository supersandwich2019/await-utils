

export async function sleep(interval: number) {
  return new Promise<void>((resolve, _reject) => {
    setTimeout(resolve, interval);
  });
}

import Mutex from './mutex';
import Mutexs from './mutexs';

export { Mutex, Mutexs };
