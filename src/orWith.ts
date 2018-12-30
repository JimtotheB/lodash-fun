/**
 * @file orWith
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {curryN, ReturnsType, FunctionOrType} from './'


/**
 * Applies its third argument to Functions FunA and FunB returning the logical OR of their results.
 *
 * ```
 * let A (arg) => arg < 100
 * let B (arg) => arg > 200
 * let ls100gt200 = andWith(A, B)
 * ls100gt200(99) //true
 * ls100gt200(201) //true
 * ls100gt200(150) //false
 * ```
 *
 * @param funA The first function to apply `arg` to.
 * @param funB The second function to apply `arg` to.
 * @param arg - The value to apply to `funA` and `funB`
 *
 * @returns The logical OR of the result of `funA(arg)`, `funB(arg)` - `(funA(arg) || funB(arg))`
 */
export function orWith(funA: ReturnsType<boolean>, funB?: ReturnsType<boolean>, arg?: any): FunctionOrType<boolean> {
  return curryN(3, (fA,fB, a) => (fA(a) || fB(a)), ...arguments)
}