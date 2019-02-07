/**
 * @file missingKeysDeep
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {missingKeysDeep} from "../src/modules/missingKeysDeep";

describe('missingKeysDeep', () => {
  test('Deeply Compares two objects ,Returns missing keys', () => {
    let compareObj = {a: 1, b: 2, c: {d: 3}}
    let findMissing = missingKeysDeep(compareObj)
    let conforming = {a: 2, b: 9, c: {d: 16}}
    let nonConforming = {a: 9}
    expect(findMissing(conforming)).toEqual([])
    expect(findMissing(nonConforming)).toEqual(['b', 'c.d'])
  })
});