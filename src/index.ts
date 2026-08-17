import { tick as origTick } from '@angular/core/testing';
import { asyncScheduler } from 'rxjs';

let fakeTime = (new Date()).getMilliseconds();

asyncScheduler.now = () => fakeTime;

export const tick = (n?: number) => {
    if (!n) {
        return origTick();
    }
    fakeTime += n;
    return origTick(n);
};

export const setFakeTime = (time: number) => fakeTime = time;
