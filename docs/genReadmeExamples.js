import { lensPath } from 'ramda';

import {
  idxByProp, idxByPath, idxByLens,
  containsByProp, containsByPath, containsByLens,
  findByProp, findByPath, findByLens,
  findById
} from '../src/index';

(function testApiExamples() {

  console.log('\n\nfind index');
  console.log('--------------');
  {
    // example
    idxByProp('p', 10, [ {p:5}, {p:10}, {p:15} ]); //=> 1
    idxByProp('p', 20, [ {p:5}, {p:10}, {p:15} ]); //=> -1
    console.log(idxByProp('p', 10, [ {p:5}, {p:10}, {p:15}]));
    console.log(idxByProp('p', 20, [ {p:5}, {p:10}, {p:15}]));

    // example
    idxByPath(['p1', 'p2'], 'c', [ {p1:{p2:'a'}}, {p1:{p2:'b'}}, {p1:{p2:'c'}} ]); //=> 2
    console.log(idxByPath(['p1', 'p2'], 'c', [{p1:{p2:'a'}}, {p1:{p2:'b'}}, {p1:{p2:'c'}}]));

    // example
    // import { lensPath } from 'ramda';
    const lens = lensPath(['p1', 'p2']);
    idxByLens(lens, {v:0}, [ {p1:{p2:{v:0}}}, {p1:{p2:{v:1}}} ]); //=> 0
    console.log(idxByLens(lens, {v:0}, [ {p1:{p2:{v:0}}}, {p1:{p2:{v:1}}} ]));
  }

  console.log('\n\ncontains');
  console.log('--------------');
  {
    // example
    containsByProp('p', 10, [ {p:5}, {p:10}, {p:15} ]); //=> true
    containsByProp('p', 20, [ {p:5}, {p:10}, {p:15} ]); //=> false
    console.log(containsByProp('p', 10, [ {p:5}, {p:10}, {p:15} ]));
    console.log(containsByProp('p', 20, [ {p:5}, {p:10}, {p:15} ]));

    // example
    containsByPath(['p1', 'p2'], 'b', [ {p1:{p2:'a'}}, {p1:{p2:'b'}}, {p1:{p2:'c'}} ]); //=> true
    console.log(containsByPath(['p1', 'p2'], 'b', [ {p1:{p2:'a'}}, {p1:{p2:'b'}}, {p1:{p2:'c'}} ]));

    // import { lensPath } from 'ramda';
    const lens = lensPath(['p1', 'p2']);
    containsByLens(lens, {v:1}, [ {p1:{p2:{v:0}}}, {p1:{p2:{v:1}}} ]); //=> true
    console.log(containsByLens(lens, {v:1}, [ {p1:{p2:{v:0}}}, {p1:{p2:{v:1}}} ]));
  }

  console.log('\n\nfind');
  console.log('--------------');
  {
    // example
    findByProp('i', 1, [ {p:'1st', i:0}, {p:'2nd', i:1}, {p:'3rd', i:2} ]); //=> { p: '2nd', i: 1 }
    console.log(findByProp('i', 1, [ {p:'1st', i:0}, {p:'2nd', i:1}, {p:'3rd', i:2} ]));

    // example
    findByPath(['p1', 'p2'], 'c', [ {p1:{p2:'a'}}, {p1:{p2:'b'}}, {p1:{p2:'c'}} ]); //=> { p1: { p2: 'c' } }
    console.log(findByPath(['p1', 'p2'], 'c', [ {p1:{p2:'a'}}, {p1:{p2:'b'}}, {p1:{p2:'c'}} ]));

    // example
    const lens = lensPath(['p1', 'p2']);
    findByLens(lens, 'a', [ {p1:{p2:'a'}}, {p1:{p2:'b'}}, {p1:{p2:'c'}} ]); //=> { p1: { p2: 'a' } }
    console.log(findByLens(lens, 'a', [ {p1:{p2:'a'}}, {p1:{p2:'b'}}, {p1:{p2:'c'}} ]));

  }

  console.log('\n\nintro');
  console.log('--------------');
  const friends = [ {name:'Bob', age:44}, {name:'Bill', age: 33}, {name:'Jane', age:22} ];
  const isBillAFriend = containsByProp('name', 'Bill', friends); //=> true
  const isHankAFriend = containsByProp('name', 'Hank', friends); //=> false
  console.log('isBillAFriend: ', isBillAFriend);
  console.log('isHankAFriend: ', isHankAFriend);

  const people = [{id:1, name:'Bob', age:44}, {id:2, name:'Bill', age:33}, {id:3, name:'Jane', age:22}];
  const personOfInterest = findById(3, people); //=> { id: 3, name: 'Jane', age: 22 }
  console.log('personOfInterest: ', personOfInterest);

  const peopleWithPets = [{name:'Bob', pet:{ type:'dog' }}, {name:'Jane', pet:{ type:'cat'}}];
  const catLover = findByPath(['pet', 'type'], 'cat', peopleWithPets); //=> { id: 3, name: 'Jane', age: 22 }
  console.log('catLover: ', catLover);

}());
