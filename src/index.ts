/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */


export interface ReturnsType<T> {
  (arg: any): T
}

export {andWith} from './andWith'
export {curryN} from './curryN'
export {flattenKeys} from './flattenKeys'
export {ifElseWith} from './ifElseWith'
export {orWith} from './orWith'
export {unflattenKeys} from './unflattenKeys'