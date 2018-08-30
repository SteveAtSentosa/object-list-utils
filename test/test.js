import { expect } from 'chai';
import { lensProp, lensPath } from 'ramda';
import {
  idxByProp, idxByPath, idxByLens,
  containsByProp, containsByPath, containsByLens,
  findByProp, findByPath, findByLens,
  idxById, containsById, findById
} from '../src/index';

const odeep = idx => ({d1:{d2:{d3:{ final: `deep_${idx}`}}}});
const o0 = { p1: 'p1_0', p2: 'p2_0', p3: 'p3_0', p4: 'p4_0', nest: { pn: 'pn_0'}, deep: odeep(0), id:0 };
const o1 = { p1: 'p1_1', p2: 'p2_1', p3: 'p3_1', p4: 'p4_1', nest: { pn: 'pn_1'}, deep: odeep(1), id:1 };
const o2 = { p1: 'p1_2', p2: 'p2_2', p3: 'p3_2', p4: 'p4_2', nest: { pn: 'pn_2'}, deep: odeep(2), id:2 };
const odup = { p1: 'p1_0', p2: 'p2_0', p3: 'p3_0', p4: 'p4_0', nest: { pn: 'pn_0'}, deep: odeep(0), id:0 }; // dup to entry 0
const o4 = { p1: 'p1_4', p2: 'p2_4', p3: 'p3_4', p4: 'p4_4', nest: { pn: 'pn_4'}, deep: odeep(4), id:4 };

const objList = [ o0, o1, o2, odup, o4 ];

describe('Find Index...', () => {
  it('should find the correct index by prop', () => {
    expect(idxByProp('p3', 'p3_0', objList)).to.equal(0);
    expect(idxByProp('p2', 'p2_2', objList)).to.equal(2);
    expect(idxByProp('p1', 'p1_4', objList)).to.equal(4);
    expect(idxByProp('p2', 'p2_na', objList)).to.equal(-1);
    expect(idxByProp('p_na', 'na', objList)).to.equal(-1);
  });
  it('should find the correct index by path', () => {
    expect(idxByPath(['nest', 'pn'], 'pn_0', objList)).to.equal(0);
    expect(idxByPath(['nest', 'pn'], 'pn_1', objList)).to.equal(1);
    expect(idxByPath(['nest', 'pn'], 'pn_4', objList)).to.equal(4);
    expect(idxByPath(['deep', 'd1', 'd2', 'd3', 'final'], 'deep_4', objList)).to.equal(4);
    expect(idxByPath(['bad', 'path'], 'pn_4', objList)).to.equal(-1);
    expect(idxByPath(['nest', 'pn'], 'noval', objList)).to.equal(-1);

  });
  it('should find the correct index by lens', () => {
    expect(idxByLens(lensProp('p1'), 'p1_0', objList)).to.equal(0);
    expect(idxByLens(lensProp('p1'), 'p1_4', objList)).to.equal(4);
    expect(idxByLens(lensPath(['nest', 'pn']), 'pn_1', objList)).to.equal(1);
    expect(idxByLens(lensPath(['nest', 'pn']), 'pn_4', objList)).to.equal(4);
    expect(idxByLens(lensPath(['deep', 'd1', 'd2', 'd3', 'final']), 'deep_1', objList)).to.equal(1);
    expect(idxByLens(lensProp('bad'), 'p1_0', objList)).to.equal(-1);
    expect(idxByLens(lensPath(['bad', 'path']), 'pn_4', objList)).to.equal(-1);
  });
});

describe('List contains...', () => {
  it('should determine contains by prop', () => {
    expect(containsByProp('p4', 'p4_2', objList)).to.equal(true);
    expect(containsByProp('p1', 'p1_4', objList)).to.equal(true);
    expect(containsByProp('p2', 'p2_na', objList)).to.equal(false);
    expect(containsByProp('p_na', 'na', objList)).to.equal(false);
  });
  it('should determine contains by path', () => {
    expect(containsByPath(['nest', 'pn'], 'pn_4', objList)).to.equal(true);
    expect(containsByPath(['p2'], 'p2_1', objList)).to.equal(true);
    expect(containsByPath(['bad', 'path'], 'pn_4', objList)).to.equal(false);
    expect(containsByPath(['nest', 'pn'], 'noval', objList)).to.equal(false);
  });
  it('should determine contains by lens', () => {
    expect(containsByLens(lensProp('p1'), 'p1_0', objList)).to.equal(true);
    expect(containsByLens(lensPath(['p1']), 'p1_0', objList)).to.equal(true);
    expect(containsByLens(lensPath(['nest', 'pn']), 'pn_0', objList)).to.equal(true);
    expect(containsByLens(lensPath([]), 'pn_0', objList)).to.equal(false);
  });
});

describe('Find objects in list...', () => {
  it('should find by prop', () => {
    expect(findByProp('p4', 'p4_2', objList)).to.equal(o2);
    expect(findByProp('p1', 'p1_4', objList)).to.equal(o4);
    expect(findByProp('p_na', 'p1_4', objList)).to.equal(undefined);
  });
  it('should find by path', () => {
    expect(findByPath(['p4'], 'p4_2', objList)).to.equal(o2);
    expect(findByPath(['deep', 'd1', 'd2', 'd3', 'final'], 'deep_2', objList)).to.equal(o2);
    expect(findByPath(['deep', 'd1', 'd2', 'd3'], 'deep_2', objList)).to.equal(undefined);
  });
  it('should find by lens', () => {
    expect(findByLens(lensPath(['deep', 'd1', 'd2', 'd3', 'final']), 'deep_1', objList)).to.equal(o1);
    expect(findByLens(lensProp('nest'), { pn: 'pn_0'}, objList)).to.equal(o0);
    expect(findByLens(lensProp('nest'), { pn: 'pn_na'}, objList)).to.equal(undefined);
  });
});

describe('Objects with id props...', () => {
  it('should handle ids', () => {
    expect(idxById(4, objList)).to.equal(4);
    expect(containsById(2, objList)).to.equal(true);
    expect(findById(1, objList)).to.equal(o1);
  });
});
