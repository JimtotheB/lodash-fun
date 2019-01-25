/**
 * @file conformDeepP
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {compose, curry, filter, identity, isError, isFunction, isObject, mapValues, negate, omitBy, has} from 'lodash/fp'
import {flattenKeys} from './flattenKeys'
import * as Bluebird from 'bluebird'
// @ts-ignore
const uncappedMapValues = mapValues.convert({cap: false})

/**
 * Checks for Type ConformDeepError
 * @param error
 */
export function isConformDeepError(error: Error | ConformDeepError): error is ConformDeepError {
  return has('validationErrors', error)
}

export interface ConformDeepValidationErrors {
  [key: string]: Error
}

/**
 * Error returned by a rejecting [[conformDeep]].
 *
 * @see [[conformDeep]]
 */
export class ConformDeepError extends Error {
  /**
   *
   * @param message
   * @param validationErrors Contains a flattened representation of the keys containing
   * errors.
   *
   * ```
   * .catch((err: ConformDeepError) => {
   *   console.log(err.validationErrors) {'stats.age': Error(...), 'stats.height': Error(...)}
   * })
   * ```
   */
  constructor(message: string, public validationErrors: ConformDeepValidationErrors){
    super(message)
    this.name = 'ConformDeepError'
    this.validationErrors = validationErrors
  }
}


export type TypeOrErr<T> = T | Error


/**
 * This function will be called by [[conformDeep]] with the matching property value of the object
 * being validated and the entire source object under test as its second arg.
 *
 * @see [[conformDeep]]
 * @see [[ConformDeepValidator]]
 *
 */
export interface ConformDeepValidatorFun {
  /**
   *
   * ```
   * const validator: ConformDeepValidator = {
   *   name: (name, srcObj) => name,
   *   age: (age, srcObj) => age,
   *   member: (member, srcObj) => !!srcObj.name === 'Bob', // Reference the source object
   *   owes: (owes, srcObj) => Promise.resolve(owes + 100), // Return promises or values
   *   valid: (valid, srcObj) => throw new Error('Sorry'), // Marks the object invalid
   *   some_constant: 10000 // Resulting object will always contain this value.
   * }
   * ```
   *
   * @param arg The property matching value from the object being validated.
   * @param srcConf The entire object being validated.
   *
   * @returns Promise, Error, or value
   */
  (arg: any, srcConf?: object): any
}

/**
 * A deeply nested object containing [[ConformDeepValidatorFun]]'s, a nested [[ConformDeepValidator]]
 * or constant values
 *
 *
 *
 * @see [[conformDeep]]
 * @see [[ConformDeepValidatorFun]]
 */
export interface ConformDeepValidator {
  /**
   * ```
   * const validator: ConformDeepValidator = {
   *   name: (name, srcObj) => name,
   *   stats: {
   *     age: (age, srcObj) => age,
   *     height: (height, srcObj) => height
   *   }
   * }
   * ```
   */
  [key: string]: ConformDeepValidatorFun | ConformDeepValidator | any
}

const errorsFrom: any = compose(omitBy(negate(isError)),flattenKeys)

const isValid = flattenSrc => !filter(isError,flattenKeys(flattenSrc)).length

const conform = curry((validatorObj, config): Bluebird<any> =>{

  const recurConform = (v, c) => {
    return Bluebird.try(() => {
      let confObj = !!c ? c : {}

      let validated = uncappedMapValues((val, idx) => {
        if(isFunction(val)) {return Bluebird.try(() => val(confObj[idx] || null, config)).catch(identity)}
        if(isObject(val)) {
          return Bluebird.props(recurConform(val, confObj[idx]))
            .catch(err => err.validationErrors)
        }
        return Promise.resolve(val)
      }, v)

      return Bluebird.props(validated)
        .then((res): any => {
          if(isValid(res)){
            return res
          }
          throw new ConformDeepError('Provided Object has error values.', errorsFrom(res))
        })
    })
  }
  return recurConform(validatorObj, config)
})


/**
 *
 * Accepts an object containing functions to be applied to each property value in the second argument.
 *
 * @see [[ConformDeepValidator]] For details on the full validator object.
 * @see [[ConformDeepValidatorFun]] For details on the arguments and return values of validator functions.
 * @see [[ConformDeepError]] For details on the rejection value from a failing `conformDeep`
 *
 * ---
 *
 * Returns a Promise containing the validated object unless any of the individual validators throw or return
 * an Error object. Rejects with [[ConformDeepError]] otherwise, containing a [[flattenKeys]] representation
 * of the errors encountered.
 *
 * ```
 * const personValidator: ConformDeepValidator = {
 *   name: (name, srcObj): TypeOrErr<string> => !!name ? name : 'No Name!',
 *   age: (age, srcObj): TypeOrErr<Promise<string>| string> => !!age ? age : Promise.resolve(0), // Can be Async
 * }
 *
 * const validatePerson = conformDeep(personValidator)
 * validatePerson({}) // {name: 'No name', age: 0}
 * validatePerson({name: 'bob, age: 47}) // {name: 'Bob', age: '47'}
 * ```
 *
 * @param validatorObj An object containing functions matching your expected `srcObj`
 * @param srcObj
 *
 * @returns Curried function accepting `srcObj` or a Promise containing the conforming object.
 */
export function conformDeep(validatorObj: ConformDeepValidator | object, srcObj?: object) {
  // @ts-ignore
  return conform(...arguments)
}
