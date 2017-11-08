# Rationale

This library aims to provide helpers to test Angular apps that are not provided natively. For now it especially focusses on timing issues with [rx](http://reactivex.io/rxjs/).

# Features

## Whats wrong with Angulars test helpers

Suppose you want to test following code:

``` javascript
function delayOneSec(val) {
    return Observable.of(val).delay(1000);
}
```

To test this in Angular, you could write:

``` javascript
describe('my suite', () => {
    it('should wait one second', fakeAsync(() => {
        let result = null;
        delayOneSec('hello').subscribe(v => result = v);
        expect(result).toBeNull();
        tick(1000); // Move time forward 1 second
        expect(result).toBe('hello');
    });
});
```

This test would fail. That is because the rx `delay()` operator doesn't only use `setTimeout()` or `setInterval()` internally, but also uses the rx Scheduler `now()` method to check whether time has really passed. By default it uses `Scheduler.async` of which the `now()` function resolves to getting the current time.
See [angular issue #8678](https://github.com/angular/angular/issues/8678)

## Solution provided by this lib

When this library is used, the `Scheduler.async.now()` function is overridden to return a virtual time. This time is automatically put forward when the `tick()` function of this library is called.

In addition it provides `setFakeTime()` to set the time manually.

## Usage

Instead of importing `tick()` from `'@angular/core/testing'`, import it from this library. So instead of

``` javascript
import { fakeAsync, tick } from '@angular/core/testing';
```

use

``` javascript
import { fakeAsync } from '@angular/core/testing';
import { tick } from 'angular-testing-ext';
```

# Conclusion

Lets hope Angular will provide it's own way of dealing with this in the future.
