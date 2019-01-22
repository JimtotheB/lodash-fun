import {andWith} from "../src";

/**
 * @file composeP
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {flowP} from '../src/modules/flowP'

describe('Returns a function that applies its arguments to the provided function from left to right.', function () {
  let FromRightToLeft = flowP(
    s => `${s} Left`,
      s => `${s} to` ,
      s => `${s} Right`)

  test('Applies its function in correct order, returns a Promise.', async () => {
    let result = await FromRightToLeft('From')
    expect(result).toEqual('From Left to Right')
  })
});