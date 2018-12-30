/**
 * @file flattenKeys
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {isArray, isPlainObject, merge, reduce, toPairs,} from 'lodash/fp'


const flatten = (obj: object, path: string[] = []): {[key: string]: any} => {
  return (isPlainObject(obj) || isArray(obj))
    ? reduce((acc, [k, v]) => merge(acc, flatten(v, [...path, k])), {}, toPairs(obj))
    : {[path.join('.')]: obj}
}


/**
 * Flattens objects into an un-nested object with property names computed from its nested paths.
 *
 * ```
 * let obj = {
 *   a: {
 *     b: 'Im nested'
 *   },
 *   c: [1,2,3,4]
 * }
 *
 * flattenKeys(obj)
 * // {"a.b": 'I'm nested', "c.0": 1, "c.1": 2, "c.2": 3, "c.3": 4}
 * ```

 *
 * @param obj The object to flatten.
 */
export function flattenKeys(obj: object): {[key: string]: any} {
  return flatten(obj)
}