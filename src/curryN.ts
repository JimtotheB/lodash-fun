/**
 * @file curryN
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {drop} from 'lodash/fp'

/**
 * Used for building curried functions so the Typescript Type system is available. This function wraps
 * the function provided as its second argument and calls it when `N` number of arguments have been supplied.
 * Generally `FP.curry(fn)` is sufficient for everyday usage. If you wish to create a curried
 * function for use by others with types, something like this is helpful.
 *
 *
 * Intermediate function returned by the wrapping function are going to have a pretty blurry
 * type situation. The remedy to this a a giant list of Interfaces and overloads to perfectly describe your return
 * values.
 *
 * ```
 * function myFunToCurry(a: string, b?: string, c?: string): (...args) => any | string {
 *   return curryN(3, (a,b,c)=> `${a} is ${b} ${c}`, ...arguments)
 * }
 * ```
 *
 * @param N The expected argument count
 * @param fun The function to be called when all of the arguments have been supplied.
 * @param args The spread `...arguments` from the wrapping function.
 */

export function curryN(N: number, fun, ...args): any  {
  if(args.length < N){
    return curryN.bind(null, N, fun, ...args)
  }
  let curriedArgs = drop(2, arguments)

  return fun(...curriedArgs)
}