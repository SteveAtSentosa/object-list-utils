## What Up

Need to see if an object is in a list?
```javascript
const friends = [ {name:'Bob', age:44}, {name:'Bill', age: 33}, {name:'Jane', age:22} ];
const isBillAFriend = containsByProp('name', 'Bill', friends); //=> true
const isHankAFriend = containsByProp('name', 'Hank', friends); //=> false
```

Need to pull an object out of a list by id?
```javascript
const people = [{id:1, name:'Bob', age:44}, {id:2, name:'Bill', age:33}, {id:3, name:'Jane', age:22}];
const personOfInterest = findById(3, people); //=> { id: 3, name: 'Jane', age: 22 }
```

Need to find objects in a list based on nested properties?
```javascript
const peopleWithPets = [{name:'Bob', pet:{ type:'dog' }}, {name:'Jane', pet:{ type:'cat'}}];
const catLover = findByPath(['pet', 'type'], 'cat', peopleWithPets); //=> { id: 3, name: 'Jane', age: 22 }
```

object-list-utils does these things and more.  Have a look below.

**Notes**

Some of the utilites allow interacting with object lists using [ramda lenses](http://randycoulman.com/blog/2016/07/12/thinking-in-ramda-lenses/)

All functions are curried, so you can create your own customizations by partially applying arguments.

## install

```bash
npm install object-list-utils --save
# or
yarn add object-list-utils
```

## API Overview

For lists of objects, for example:
```javascript
[ {p:v1}, {p:v2}, {p:v3}, etc ]
[ {p1: {p2:v1}}, {p1: {p2:v2}}, {p1: {p2:v2}}, etc ]
```

```javascript
idxByProp(prop, propVal, objList); // find idx of object in list by prop and val
idxByPath(path, propVal, objList); // find idx of object in list by path and val
idxByLens(lens, propVal, objList); // find idx of object in list by lens and val
```

```javascript
containsByProp(prop, propVal, objList); // does list contain object by prop and val
containsByPath(path, propVal, objList); // does list contain object by path and val
containsByLens(lens, propVal, objList); // does list contain object by lens and val
```

```javascript
findByProp(prop, propVal, objList); // find object in list by prop and val
findByPath(path, propVal, objList); // find object in list by path and val
findByLens(lens, propVal, objList); // find object in list by lens and val
```

```javascript
idxById(id, objectList);       // find idx of object in list with matching id
containsById(id, objectList);  // does list contain object with matching id
findById(id, objectList);      // find object in list with matching id
```


## API Details

#### Find specified object in a list

```javascript
// return true if one of the objects in list satisfies view(lens, obj) === propVal,
// otherwise return false
// '' -> a -> [{}] -> {}
export const findByProp = curry((prop, propVal, objList) =>

// example
findByProp('i', 1, [{p:'1st', i:0}, {p:'2nd', i:1}, {p:'3rd', i:2}]); //=> { p:'2nd', i:1 }
```

```javascript
// return first object in list with matching path[0].path[1].path[...][propVal]
// or undefined if no matches
// [''] -> a -> [{}] -> {}
export const findByPath = curry((path, propVal, objList) =>

// example
findByPath(['p1', 'p2'], 'c', [ {p1:{p2:'a'}}, {p1:{p2:'b'}}, {p1:{p2:'c'}} ]); //=> { p1: { p2: 'c' } }
```

```javascript
// return first object in list with view(lens, obj) === propVal, or undefined if no matches
// lens -> a -> [{}] -> {}
export const findBylens = curry((lens, propVal, objList) =>

// example
const lens = lensPath(['p1', 'p2']);
findByLens(lens, 'a', [ {p1:{p2:'a'}}, {p1:{p2:'b'}}, {p1:{p2:'c'}} ]); //=> { p1: { p2: 'a' } }
```

#### Find object index

```javascript
// return index of first object in list with matching propName[propVal], or -1 if no match
// '' -> a -> [{}] -> int
export const idxByProp = curry((prop, propVal, objList) =>

// example
idxByProp('p', 10, [ {p:5}, {p:10}, {p:15} ]); //=> 1
idxByProp('p', 20, [ {p:5}, {p:10}, {p:15} ]); //=> -1
```

```javascript
// return index of first object in list with matching path[0].path[1].path[...][propVal],
// or -1 if no match
//[''] -> a -> [{}] -> int
export const idxByPath = curry((path, propVal, objList) =>

// example
idxByPath(['p1', 'p2'], 'c', [ {p1:{p2:'a'}}, {p1:{p2:'b'}}, {p1:{p2:'c'}} ]); //=> 2
```

```javascript
// return index of first object in list with view(lens, obj) === propVal, or -1 if no match
// lens -> a -> [{}] -> int
export const idxByLens = curry((lens, propVal, objList) =>

// example
import { lensPath } from 'ramda';
const lens = lensPath(['p1', 'p2']);
idxByLens(lens, {v:0}, [ {p1:{p2:{v:0}}}, {p1:{p2:{v:1}}} ]); //=> 0
```

#### Does an object exist in a list

```javascript
// return true if one of the objects in list has matching propName[propVal], otherwise return false
// '' -> a -> [{}] -> bool
export const containsByProp = curry((propName, propVal, objList) =>

// example
containsByProp('p', 10, [ {p:5}, {p:10}, {p:15} ]); //=> true
containsByProp('p', 20, [ {p:5}, {p:10}, {p:15} ]); //=> false
```

```javascript
// return true if one of the objects in list has matching path[0].path[1].path[...][propVal]
// otherwise return false
//[''] -> a -> [{}] -> bool
export const containsByPath = curry((path, propVal, objList) =>

// example
containsByPath(['p1', 'p2'], 'b', [ {p1:{p2:'a'}}, {p1:{p2:'b'}}, {p1:{p2:'c'}} ]); //=> true
```

```javascript
// return true if one of the objects in list satisfies view(lens, obj) === propVal,
// otherwise return false
// lens -> a -> [{}] -> bool
export const containsByLens = curry((lens, propVal, objList) =>

import { lensPath } from 'ramda';
const lens = lensPath(['p1', 'p2']);
containsByLens(lens, {v:1}, [ {p1:{p2:{v:0}}}, {p1:{p2:{v:1}}} ]); //=> true
```

#### Utils dealing with lists of objects that have 'id' prop

```javascript
// return index of first obj in list with matching id, -1 if no match
// id -> [{}] -> int
export const idxById = idxByProp('id');
```

```javascript
// reutrn true if one of the objects in list has a matching id, otherwise false
// id -> [{}] -> bool
export const containsById = containsByProp('id');
```

```javascript
// return first object in list with matching id, or undefined if no matches
// id -> [{}] -> {}
export const findById = findByProp('id');
```
