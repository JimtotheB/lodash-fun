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
export * from './modules/andWith'
export * from './modules/switchWith'
export * from './modules/flattenKeys'
export * from './modules/ifElseWith'
export * from './modules/orWith'
export * from './modules/unflattenKeys'
export * from './modules/hasKeysWith'
export * from './modules/composeP'
export * from './modules/flowP'
export * from './modules/missingKeysDeep'
export * from './modules/transformKeys'