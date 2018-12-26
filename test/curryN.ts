/**
 * @file curryN
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {curryN} from "../src/curryN";

describe('CurryN', function () {

  function myFunToCurry(a: string, b?: string, c?: string): (...args: any) => any | string {
    return curryN(3, (a, b, c) => `${a} is ${b} ${c}`, ...arguments)
  }

  test('Curries correctly.', () => {

    let Functional = myFunToCurry('Functional Programming')
    let totallyIs = Functional('totally')
    let cool = totallyIs('cool!')
    let rad = totallyIs('rad!')
    let awesome = totallyIs('awesome!')
    expect(cool).toEqual('Functional Programming is totally cool!')
    expect(rad).toEqual('Functional Programming is totally rad!')
    expect(awesome).toEqual('Functional Programming is totally awesome!')

  })

  test('Calls provided function right away if all args present', () => {
    let res = myFunToCurry('This', 'tricky', 'right?')
    console.log(res)
  })
});