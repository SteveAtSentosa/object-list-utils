import { assert, expect } from 'chai';
import { idxByPropVal } from '../src/index';

describe('Invalid lens creation', () => {

  it('shoud think 1=1', () => {
    expect(idxByPropVal('p', 2, [{p:1}, {p:2}, {p:3}])).to.equal(1);
  });

});
