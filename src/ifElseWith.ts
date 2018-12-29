/**
 * @file ifElseWith
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {curry} from 'lodash/fp'

import {curryN} from './'
import {ReturnsType} from './'


/**
 * Applies its fourth argument to the first argument `comparator` returning the result of passing `arg` to `trueConditionFun` if true
 * or to `falseConditionFun` if false.
 *
 * ```
 * let comparator = (arg) => arg >= 100
 * let tCond = (arg) => `${arg} is less than 100...`
 * let fCond = (arg) => `${arg} is large enough to work`
 * let testNumber = ifElseWith(comparator, tCond, fCond)
 * testNumber(99) // '99 is less than 100...'
 * testNumber(101) // '101 is large enough to work.
 * ls100gt200(150) //false
 * ```
 *
 * @param funA The first function to apply `arg` to.
 * @param funB The second function to apply `arg` to.
 * @param arg - The value to apply to `funA` and `funB`
 *
 * @returns The result of `trueConditionFun(arg)` if `comparator(arg)` is true, `falseConditionFun(arg)` otherwise.
 * `return comparator(arg) ? trueConditionFun(arg) : falseConditionFun(arg)`
 *
 */
export function ifElseWith(comparator: ReturnsType<any>, trueConditionFun?: ReturnsType<any>, falseConditionFun?: ReturnsType<any>, arg?: any){
  return curryN(4, (c, tCond, fCond, arg) => c(arg) ? tCond(arg) : fCond(arg), ...arguments)
}