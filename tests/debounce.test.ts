import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { debounce } from '../src/lib/client/debounce.ts';

test('debounce: only the trailing call fires after the wait', () => {
  const calls: number[] = [];
  const fn = (n: number) => calls.push(n);
  const debounced = debounce(fn, 100);
  mock.timers.enable({ apis: ['setTimeout'] });
  try {
    debounced(1);
    debounced(2);
    debounced(3);
    assert.deepEqual(calls, []);
    mock.timers.tick(99);
    assert.deepEqual(calls, []);
    mock.timers.tick(1);
    assert.deepEqual(calls, [3]);
  } finally {
    mock.timers.reset();
  }
});

test('debounce: cancel() prevents the trailing call', () => {
  const calls: number[] = [];
  const debounced = debounce((n: number) => calls.push(n), 100);
  mock.timers.enable({ apis: ['setTimeout'] });
  try {
    debounced(1);
    debounced.cancel();
    mock.timers.tick(200);
    assert.deepEqual(calls, []);
  } finally {
    mock.timers.reset();
  }
});
