import { tick as origTick } from '@angular/core/testing';
import { Scheduler } from 'rxjs/Rx';
import 'rxjs/scheduler/AsyncScheduler';

let fakeTime = (new Date()).getMilliseconds();

Scheduler.async['now'] = () => fakeTime;

export const tick = (n?: number) => {
    if (!n) {
        return origTick();
    }
    fakeTime += n;
    return origTick(n);
};

export const setFakeTime = (time: number) => fakeTime = time;
