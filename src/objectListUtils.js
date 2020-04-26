import { curry, view, propEq, pathEq, equals, findIndex, find, /* filter */ } from 'ramda';
import { lensEq } from 'ramda-adjunct';
// import { propNotEq } from 'ramda-adjunct';


//**************************************************************************************************
// Find index of an object in a list
//**************************************************************************************************

// return index of first object in list with matching propName[propVal], or -1 if no match
// '' -> a -> [{}] -> int
export const idxByProp = curry((propName, propVal, objList) =>
  findIndex(propEq(propName, propVal), objList));

// return index of first object in list with matching path[0].path[1].path[...][propVal,
// or -1 if no match
//[''] -> a -> [{}] -> int
export const idxByPath = curry((path, propVal, objList) =>
  findIndex(pathEq(path, propVal), objList));

// return index of first object in list with view(lens, obj) === propVal, or -1 if no match
// lens -> a -> [{}] -> int
export const idxByLens = curry((lens, propVal, objList) =>
  findIndex(lensEq(lens, propVal), objList));

//**************************************************************************************************
// Does a list contain specified object
//**************************************************************************************************

// return true if one of the objects in list has matching propName[propVal], otherwise return false
// '' -> a -> [{}] -> bool
export const containsByProp = curry((propName, propVal, objList) =>
  idxByProp(propName, propVal, objList) > -1);

// return true if one of the objects in list has matching path[0].path[1].path[...][propVal]
// otherwise return false
//[''] -> a -> [{}] -> bool
export const containsByPath = curry((path, propVal, objList) =>
  idxByPath(path, propVal, objList) > -1);

// return true if one of the objects in list satisfies view(lens, obj) === propVal,
// otherwise return false
// lens -> a -> [{}] -> bool
export const containsByLens = curry((lens, propVal, objList) =>
  idxByLens(lens, propVal, objList) > -1);


//**************************************************************************************************
// Find specified object in a list
//**************************************************************************************************

// return first object in list with matching propName[propVal], or undefined if no matches
// '' -> a -> [{}] -> {}
export const findByProp = curry((propName, propVal, objList) =>
  find(propEq(propName, propVal), objList));

// return first object in list with matching path[0].path[1].path[...][propVal]
// or undefined if no matches
// [''] -> a -> [{}] -> {}
export const findByPath = curry((path, propVal, objList) =>
  find(pathEq(path, propVal), objList));

// return first object in list with view(lens, obj) === propVal, or undefined if no matches
// lens -> a -> [{}] -> {}
export const findByLens = curry((lens, propVal, objList) =>
  find(lensEq(lens, propVal), objList));

// return list with all objects that have obj[propName]===propVal removed
// '' -> [{}] -> [{}]
// export const removeByPropVal = curry((propName, propVal, objList) =>
//   filter(propNotEq(propName, propVal),objList));

//******************************************************************************
// Utils dealing with lists of objects with 'id' propName
//******************************************************************************

// return index of first obj in list with matching id, -1 if no match
// id -> [{}] -> int
export const idxById = idxByProp('id');

// reutrn true if one of the objects in list has a matching id, otherwise false
// id -> [{}] -> bool
export const containsById = containsByProp('id');

// return first object in list with matching id, or undefined if no matches
// id -> [{}] -> {}
export const findById = findByProp('id');

//******************************************************************************
// Misc Utils
//******************************************************************************

export const propMaxVal = curry((propName, objList) =>
  Math.max(...objList.map(obj => obj[propName])))

export const propMinVal = curry((propName, objList) =>
  Math.min(...objList.map(obj => obj[propName])))