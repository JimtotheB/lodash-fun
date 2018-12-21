/**
 * @file flattenKeys
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {isArray, isPlainObject, merge, reduce, toPairs,} from 'lodash/fp'

export const flattenKeys = (obj: object, path = []): {[key: string]: any} => {
  return (isPlainObject(obj) || isArray(obj))
    ? reduce((acc, [k, v]) => merge(acc, flattenKeys(v, [...path, k])), {}, toPairs(obj))
    : {[path.join('.')]: obj}
}