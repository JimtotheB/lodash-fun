/**
 * @file orWith
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {curry} from 'lodash/fp'

export const orWith = curry((fun1: Function, fun2: Function, arg: any): boolean => {
  return (fun1(arg) || fun2(arg))
})