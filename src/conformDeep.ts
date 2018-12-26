/**
 * @file conformDeepP
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {at, compose, curry, filter, identity, isError, isFunction, isObject,mapValues, memoize, negate, omitBy} from 'lodash/fp'
import {flattenKeys} from './flattenKeys'
import * as Bluebird from 'bluebird'
// @ts-ignore
const uncappedMapValues = mapValues.convert({cap: false})


export class ConformDeepError extends Error {
  constructor(message: string, public validationErrors: {}){
    super(message)
    this.name = 'ConformDeepError'
    this.validationErrors = validationErrors
  }
}


export type TypeOrErr<T> = T | Error

interface ValidatorFun {
  (arg: any, srcConf?: object): any
}

export interface DeepConformValidator {
  [key: string]: ValidatorFun
}

const errorsFrom: any = compose(omitBy(negate(isError)),flattenKeys)

const isValid = flattenSrc => !filter(isError,flattenKeys(flattenSrc)).length

export const DeepConform = curry((validatorObj, config): Bluebird<any> =>{
  return Bluebird.try(() => {
    let confObj = !!config ? config : {}
    let validated = uncappedMapValues((val, idx) => {
      if(isFunction(val)) {return Bluebird.try(() => val(confObj[idx] || null)).catch(identity)}
      if(isObject(val)) {
        return Bluebird.props(DeepConform(val, config[idx]))
          .catch(err => err.validationErrors)
      }
      return Promise.resolve(val)
    }, validatorObj)

    return Bluebird.props(validated)
      .then((res): any => {
        if(isValid(res)){
          return res
        }
        throw new ConformDeepError('Provided Object has error values.', errorsFrom(res))
      })

  })

})
