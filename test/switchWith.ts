/**
 * @file switchWith
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {switchWith} from '../src'

describe('switchWith', () => {
  test('Curries its arguments', () => {
    let computeCase = o => o.operation
    let switchObj = {
      square: (n) => n.value * n.value,
      double: (n) => n.value + n.value
    }
    let maths = switchWith(computeCase, switchObj)
    expect(maths({value: 100, operation: 'square'})).toEqual(10000)
    expect(maths({value: 100, operation: 'double'})).toEqual(200)

  });

  test('Docs example', () => {
    let computeCase = item => !(item % 2) ? 'even' : 'odd'
    let switchObj = {
      even: i => `${i} is even.`,
      odd: i => `${i} is odd.`
    }

    let coinTossResult = switchWith(computeCase, switchObj)
    expect(coinTossResult(1)).toEqual('1 is odd.')
    expect(coinTossResult(2)).toEqual('2 is even.')
  });
});