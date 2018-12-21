/**
 * @file ifElseWith
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {ifElseWith} from '../src'

describe('ifElseWith', function () {
  test('Curries its arguments', function () {
    let ifel = ifElseWith(item => item)
    let decide = ifel(()=> 'ok', () => 'not ok')
    expect(decide(false)).toEqual('not ok')
    expect(decide(true)).toEqual('ok')

  });
});