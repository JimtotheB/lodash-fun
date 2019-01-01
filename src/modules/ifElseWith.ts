/**
 * @file ifElseWith
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {curry} from 'lodash/fp'

import {ReturnsType} from '..'

const curriedIfElseWith = curry((c, tCond, fCond, arg) => c(arg) ? tCond(arg) : fCond(arg))

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
 * @param comparator Evaluated with `arg`
 * @param trueConditionFun Called with `arg` and returned if `comparator(arg)` is true.
 * @param falseConditionFun Called with `arg` and returned if `comparator(arg)` is false
 * @param arg
 *
 * @returns The result of `trueConditionFun(arg)` if `comparator(arg)` is true, `falseConditionFun(arg)` otherwise.
 * `return comparator(arg) ? trueConditionFun(arg) : falseConditionFun(arg)`
 *
 */
export function ifElseWith(comparator: ReturnsType<boolean>, trueConditionFun?: ReturnsType<any>, falseConditionFun?: ReturnsType<any>, arg?: any){
  // @ts-ignore
  return curriedIfElseWith(...arguments)
  // return curryN(4, (c, tCond, fCond, arg) => c(arg) ? tCond(arg) : fCond(arg), ...arguments)
}