/**
 * @file ifElseWith
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {curry} from 'lodash/fp'

export const ifElseWith = curry((comparator: Function, trueFunc: Function, falseFunc: Function, arg: any): any => {
  return comparator(arg) ? trueFunc(arg) : falseFunc(arg)
})