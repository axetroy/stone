import test from 'ava';
import Stone from '../../dist/stone';

let stone;

test.beforeEach(t => {
  stone = new Stone({ username: 'axetroy' });
  t.pass();
});

test('basic', t => {
  t.truthy(stone.state);
  t.truthy(stone.subscriber);
  t.true(Array.isArray(stone.subscriber));

  t.deepEqual(stone.username, 'axetroy');
  t.deepEqual(Object.keys(stone), ['username']);

  stone.set('username', 'hello');
  t.deepEqual(stone.username, 'hello');
  t.deepEqual(Object.keys(stone), ['username']);

  t.throws(() => {
    stone.username = 'it should throw an error';
  });
});

test('set an prototype property', t => {
  stone.set('length', 333); // can't cover the private property
  t.is(stone.length, 2);
  t.is(Object.keys(stone.state).length, 2);
  t.deepEqual(Object.keys(stone), ['username']);
});
