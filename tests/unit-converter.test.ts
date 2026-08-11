import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unitConverter } from '../src/lib/calculators/unit-converter.ts';

const base = { value: '1000', category: 'length', fromlength: 'm', tolength: 'km' };

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(unitConverter.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return unitConverter.calculate(input);
}

function valueOf(out: ReturnType<typeof unitConverter.calculate>) {
  return out.results.find((r) => r.key === 'convertedValue')!.value;
}

test('unit-converter: 1000 m to km is 1', () => {
  const out = resultOf({});
  assert.equal(valueOf(out), 1);
});

test('unit-converter: 1 lb to kg is about 0.4536', () => {
  const out = resultOf({ value: '1', category: 'weight', fromweight: 'lb', toweight: 'kg' });
  const v = valueOf(out);
  assert.ok(v > 0.45359 && v < 0.4536, `got ${v}`);
});

test('unit-converter: 100 C to F is 212', () => {
  const out = resultOf({ value: '100', category: 'temperature', fromtemperature: 'celsius', totemperature: 'fahrenheit' });
  assert.equal(valueOf(out), 212);
});

test('unit-converter: 0 C to K is about 273.15', () => {
  const out = resultOf({ value: '0', category: 'temperature', fromtemperature: 'celsius', totemperature: 'kelvin' });
  const v = valueOf(out);
  assert.ok(v > 273.14 && v < 273.16, `got ${v}`);
});

test('unit-converter: negative temperature is allowed (-40 C = -40 F)', () => {
  const out = resultOf({ value: '-40', category: 'temperature', fromtemperature: 'celsius', totemperature: 'fahrenheit' });
  assert.equal(valueOf(out), -40);
});

test('unit-converter: 1 km2 to acre is about 247.105', () => {
  const out = resultOf({ value: '1', category: 'area', fromarea: 'km2', toarea: 'acre' });
  const v = valueOf(out);
  assert.ok(v > 247.104 && v < 247.106, `got ${v}`);
});

test('unit-converter: 1 gal to l is about 3.785', () => {
  const out = resultOf({ value: '1', category: 'volume', fromvolume: 'gal', tovolume: 'l' });
  const v = valueOf(out);
  assert.ok(v > 3.785 && v < 3.786, `got ${v}`);
});

test('unit-converter: negative non-temperature value is below minimum', () => {
  const errors = unitConverter.validate({ value: '-5', category: 'length', fromlength: 'm', tolength: 'km' });
  assert.equal(errors.value, 'min');
});

test('unit-converter: same unit on both sides is invalid', () => {
  const errors = unitConverter.validate({ value: '1000', category: 'length', fromlength: 'm', tolength: 'm' });
  assert.equal(errors.tolength, 'invalid');
});

test('unit-converter: empty value is required', () => {
  const errors = unitConverter.validate({ value: '', category: 'length', fromlength: 'm', tolength: 'km' });
  assert.equal(errors.value, 'required');
});
