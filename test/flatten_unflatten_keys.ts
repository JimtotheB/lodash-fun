/**
 * @file flatten_unflatten_keys
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {flattenKeys, unflattenKeys} from '../src'

describe('Flattening objects', () => {
  test('Flattens everything', () => {
    let obj = {
      nest: [
        new Map(),
        new WeakMap(),
        new Set(),
        new WeakSet(),
        new Error('Whoops.'),
        Symbol(100),
        NaN,
        Infinity,
        ['a','b'],
        item => item * 2,
        {a:{b:{c:{d: 'pretty neat!'}}}},
        Buffer.from([]),
      ]
    }
    let flat = flattenKeys(obj)

    expect(flat['nest.0']).toEqual(obj['nest'][0])
    expect(flat['nest.1']).toEqual(obj['nest'][1])
    expect(flat['nest.2']).toEqual(obj['nest'][2])
    expect(flat['nest.3']).toEqual(obj['nest'][3])
    expect(flat['nest.4']).toEqual(obj['nest'][4])
    expect(flat['nest.5']).toEqual(obj['nest'][5])
    expect(flat['nest.6']).toEqual(obj['nest'][6])
    expect(flat['nest.7']).toEqual(obj['nest'][7])
    expect(flat['nest.8.0']).toEqual(obj['nest'][8][0])
    expect(flat['nest.8.1']).toEqual(obj['nest'][8][1])
    expect(flat['nest.9']).toEqual(obj['nest'][9])
    expect(flat['nest.10.a.b.c.d']).toEqual(obj['nest'][10]['a']['b']['c']['d'])
    expect(flat['nest.11']).toEqual(obj['nest'][11])

    let unflat = unflattenKeys(flat)
    expect(unflat).toEqual(obj)


  })

})