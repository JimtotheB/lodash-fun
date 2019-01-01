/**
 * @file andWith
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */
import { ReturnsType} from '..'
import {curry} from 'lodash/fp'

const curriedAndWith = curry((fA,fB, a) => (fA(a) && fB(a)) )

/**
 * Applies its third argument to Functions FunA and FunB returning the logical AND of their results.
 *
 * ```
 * let A (arg) => arg >= 5
 * let B (arg) => arg <= 10
 * let betweenFiveAndTen = andWith(A, B)
 * betweenFiveAndTen(6) //true
 * betweenFiveAndTen(11) //false
 * ```
 *
 * @param funA The first function to apply `arg` to.
 * @param funB The second function to apply `arg` to.
 * @param arg - The value to apply to `funA` and `funB`
 *
 * @returns The logical AND of the result of `funA(arg)`, `funB(arg)` - `(funA(arg) && funB(arg))`
 */


export function andWith(funA: ReturnsType<boolean>, funB?: ReturnsType<boolean>, arg?: any) {
  // @ts-ignore
  return curriedAndWith(...arguments)
}
