/**
 * @file unflattenKeys
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */
import {compose, reduce, set, toPairs,} from 'lodash/fp'

const unflatten = compose(reduce((acc, [k, v]) => set(k, v, acc), {}), toPairs)

/**
 * Unflattens objects.
 *
 * ```
 * let flat = {
 *   'a.b': 'Ok',
 *   'c.d': 'Also ok'
 * }
 *
 * unflattenKeys(flat)
 * //{a: {b: 'Ok'}, c: {d: 'Also ok}}
 * ```
 *
 * @param obj The flattened object you wish to unflatten.
 */
export function unflattenKeys(obj: object): object {
  return unflatten(obj)
}