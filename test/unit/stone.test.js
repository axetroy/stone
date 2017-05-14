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

test('set an prototype property, like length', t => {
  stone.set('length', 333); // can't cover the private property
  t.is(stone.length, 2);
  t.is(Object.keys(stone.state).length, 2);
  t.deepEqual(Object.keys(stone), ['username']);
});

test('.remove(), delete a property', t => {
  stone.remove('username');
  t.is(Object.keys(stone).length, 0);
  t.deepEqual(stone.username, void 0);
  t.pass();
});

test('.keys(), get the keys of stone', t => {
  t.is(Object.keys(stone).length, 1);
  stone.set('age', 18);
  t.is(Object.keys(stone).length, 2);
  t.pass();
});

test('.values(), get the values of stone', t => {
  t.is(stone.values().length, 1);
  t.deepEqual(stone.values(), ['axetroy']);
  t.pass();
});

test('.stringify(), get the string of this stone', t => {
  t.deepEqual(stone.stringify(), JSON.stringify({ username: 'axetroy' }));
  t.pass();
});

test('.toString(), covert the object to string, cover native method', t => {
  t.deepEqual(stone.toString(), '[object Object]');
  t.pass();
});

test('.subscribe(), subscribe the stone change', t => {
  stone.subscribe((key, oldValue, newValue) => {
    t.deepEqual(key, 'age');
    t.deepEqual(oldValue, void 0);
    t.deepEqual(newValue, 18);
  });
  stone.set('age', 18);
  t.pass();
});

test('.subscribe(), trigger the handler like expect', t => {
  let invokeTimes = 0;
  stone.subscribe((key, oldValue, newValue) => {
    invokeTimes++;
  });
  t.deepEqual(invokeTimes, 0);
  stone.set('age', 18);
  t.deepEqual(invokeTimes, 1);
  stone.set('username', 'hello world');
  t.deepEqual(invokeTimes, 2);
  t.pass();
});

test('.subscribe(), it should return a function the cancel subscribe', t => {
  let invokeTimes = 0;
  let cancelSubscribe = stone.subscribe((key, oldValue, newValue) => {
    invokeTimes++;
  });
  t.deepEqual(invokeTimes, 0);
  stone.set('age', 18);
  t.deepEqual(invokeTimes, 1);
  cancelSubscribe();
  stone.set('age', 11);
  stone.set('age', 12);
  stone.set('age', 13);
  stone.set('age', 14);
  t.deepEqual(invokeTimes, 1); // will not call function again
  t.pass();
});

test('.watch(key), watch specify key change, base on .subscribe()', t => {
  let usernameWatcherCallTimes = 0;
  const cancel = stone.watch('username', () => {
    usernameWatcherCallTimes = usernameWatcherCallTimes + 1;
  });
  t.deepEqual(usernameWatcherCallTimes, 0);
  stone.set('age', 18);
  t.deepEqual(usernameWatcherCallTimes, 0);
  stone.set('username', 'hello world');
  t.deepEqual(usernameWatcherCallTimes, 1);

  // cancel the watcher
  cancel();

  stone.set('username', 'a');
  stone.set('username', 'b');
  stone.set('username', 'c');
  t.deepEqual(usernameWatcherCallTimes, 1);
  t.deepEqual(stone.username, 'c');
  t.pass();
});

test('.set(), set a property', t => {
  stone.set('age', 18);
  t.is(Object.keys(stone).length, 2);
  t.deepEqual(stone.username, 'axetroy');
  t.deepEqual(stone.age, 18);

  // can't reset the value
  t.throws(() => {
    stone.age = 22; // it should throw an error
  });

  t.deepEqual(stone.age, 18);

  t.pass();
});
