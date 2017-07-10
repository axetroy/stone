## stone.js

[![Greenkeeper badge](https://badges.greenkeeper.io/axetroy/stone.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/axetroy/stone.svg?branch=master)](https://travis-ci.org/axetroy/stone)
[![Dependency](https://david-dm.org/axetroy/stone.svg)](https://david-dm.org/axetroy/stone)
![License](https://img.shields.io/badge/license-MIT-green.svg)
[![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-green.svg)](https://github.com/prettier/prettier)
![Node](https://img.shields.io/badge/node-%3E=6.0-blue.svg?style=flat-square)
[![npm version](https://badge.fury.io/js/@axetroy/stone.svg)](https://badge.fury.io/js/@axetroy/stone)
 
build data stuck like a stone, Sturdy!
 
## Usage

```bash
 npm install @axetroy/stone
```
 
```javascript
import Stone from '@axetroy/stone';

const userInfo = new Stone({username:'axetroy'});

// back
userInfo.username = 'admin'; // it will throw an error.

// good
userInfo.set('username', 'admin');  // this is ok.

console.log(userInfo.username);   // print "admin"
```

## API

### .set(key:string,value:any):this

set a value.

### .remove(key:string):this

remove a key

### .subscribe(func:Function):Function

subscribe the stone change

### .watch(key:string,func:Function):Function

watch specify key change, base on ``.subscribe``

### .keys():string[]

return the keys list you set

### .values():any[]

return the values list you set

- stringify():string

convert to string, base on ``JSON.stringify()``

## Contributing

```bash
git clone https://github.com/axetroy/stone.git
cd ./stone
yarn
yarn run dev
```

## License

The [MIT License](https://github.com/axetroy/stone/blob/master/LICENSE)
