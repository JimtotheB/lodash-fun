/**
 * @file hasKeysOfType
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */


import {isString, isFunction} from 'lodash/fp'
import {hasKeysWith} from "../src";

describe('hasKeysWith', function () {

  test('Ensures an object has keys that conform to constraint function.', () => {
    let keys = ['a', 'b', 'c', 'd']
    let kw = hasKeysWith(keys, isString)

    let pass = {a:'a',b:'b',c:'c',d:'d'}
    let fail = {a:1,b:'b',c:'c',d:'d'}
    let failMissing = {b:'b',c:'c',d:'d'}

    expect(isFunction(kw)).toBeTruthy()
    expect(kw(pass)).toBeTruthy()
    expect(kw(fail)).toBeFalsy()
    expect(kw(failMissing)).toBeFalsy()

  })
});