/**
 * @file hasKeys
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {every, has, get} from 'lodash/fp'
import {curryN, FunctionOrType} from "./";




/**
 *
 * @param keys Array of keys expected in `obj`
 * @param constraintFun applied to every key if found in `obj`
 * @param obj
 */

/**
 * Ensures its third argument contains the keys in `keys` and that each passes `constraintFun`
 *
 * ```
 * let keys = ['a', 'b', 'c']
 * let constraint = v => v > 10
 * let allGt10 = hasKeysWith(keys, constraint)
 * allGt10({a: 11, b: 20, c: 30}) //true
 * allGt10({b: 20, c: 30}) //false
 * allGt10({a: 9, b: 20, c: 30}) //false
 * ```
 *
 * @param keys Array of keys expected in `obj`
 * @param constraintFun applied to every key if found in `obj`
 * @param obj
 */

export function hasKeysWith(keys: string[], constraintFun?: (item: any) => boolean, obj?: any): FunctionOrType<boolean> {
  return curryN(3, (k, cfun, o)=>{
    return every((item) => {
      return has(item, o) ? cfun(get(item, o)) : false
    }, k)
  }, ...arguments)
}