import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveTheme } from '../src/lib/theme.ts';

test('theme: explicit stored value wins', () => {
  assert.equal(resolveTheme('dark', false), 'dark');
  assert.equal(resolveTheme('light', true), 'light');
});

test('theme: unknown stored value falls back to system', () => {
  assert.equal(resolveTheme(null, true), 'dark');
  assert.equal(resolveTheme('', false), 'light');
  assert.equal(resolveTheme('weird', true), 'dark');
});

test('theme: default is light when system is light', () => {
  assert.equal(resolveTheme(null, false), 'light');
});
