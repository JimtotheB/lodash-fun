/**
 * @file andWith
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {andWith} from '../src'

describe('Applies its third argument to both provided functions, returning logical AND or results.', function () {
  let t = () => true
  let f = () => false

  test('Curries its arguments', () => {
    let firstT = andWith(t)
    let secondT = firstT(t)
    expect(secondT(true)).toBeTruthy()
  })

  test('Inputting false, false - false', function () {
    expect(andWith(f, f, false)).toBeFalsy()
  });
  test('Inputting false, true - false', function () {
    expect(andWith(f, t, false)).toBeFalsy()
  });
  test('Inputting true, false - false', function () {
    expect(andWith(t, f, false)).toBeFalsy()
  });

  test('Inputting true, true - true', function () {
    expect(andWith(t, t, false)).toBeTruthy()
  });
});

