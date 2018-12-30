/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */


export interface ReturnsType<T> {
  (arg: any): T
}

export * from './modules/conformDeep'
export {andWith} from './modules/andWith'
export * from './modules/curryN'
export {flattenKeys} from './modules/flattenKeys'
export {ifElseWith} from './modules/ifElseWith'
export {orWith} from './modules/orWith'
export {unflattenKeys} from './modules/unflattenKeys'
export {hasKeysWith} from './modules/hasKeysWith'