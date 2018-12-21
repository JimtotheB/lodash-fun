/**
 * @file orWith
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {orWith} from "../src";

describe('Applies its third argument to both provided functions, returning logical OR of the results', function () {
  let t = () => true
  let f = () => false

  test('Curries its arguments', () => {
    let firstT = orWith(t)
    let secondT = firstT(t)
    expect(secondT(true)).toBeTruthy()
  })

  test('Inputting false, false - false', function () {
    expect(orWith(f, f, false)).toBeFalsy()
  });
  test('Inputting false, true - false', function () {
    expect(orWith(f, t, false)).toBeTruthy()
  });
  test('Inputting true, false - false', function () {
    expect(orWith(t, f, false)).toBeTruthy()
  });

  test('Inputting true, true - true', function () {
    expect(orWith(t, t, false)).toBeTruthy()
  });
});