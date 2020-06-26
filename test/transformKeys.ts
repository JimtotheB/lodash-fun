/**
 * @file conformDeep
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {transformKeys, TypeOrErr, conformTransformed, ConformError, isConformError} from "../src";

describe('transformKeys', () => {
  test('Deeply transforming object keys', async () => {
    let obj = {player: {name: 'bob', age: 10}, profile: {rank: 10, score: 1000}}
    let expectObj = {player: {name: 'bob', age: 20}, profile: {rank: 10, score: 1000}}

    let playerValidatorFns = {
      name: (name : string, config) : TypeOrErr<string> => name,
      age: (age) => age * 2
    }

    let profileValidatorFuns = {
      rank: (rank, config) => rank,
      score: (score, config) => score
    }
    let playerValidatorFn = {
      player: playerValidatorFns,
      profile: profileValidatorFuns
    }
    let transformObj = transformKeys(playerValidatorFn)


    let v = await transformObj(obj)

    expect(v).toEqual(expect.objectContaining(expectObj))

  })

  test('Nested Transform Errors ', async () => {

    let objectValidatorFuns = {
      name: (name) => {
        return name
      },
      stats: {
        age: (age) => {
          return age
        },
        birthday: (birthday) => {
          throw new Error('You need a birthday')
        }
      }
    }

    let transformObj = transformKeys(objectValidatorFuns)

    let expectObj = {name: 'bob', stats: {age: 10, birthday: new Error('You need a birthday')}}
    let obj = {name: 'bob', stats: {age: 10, birthday: 20}}

    let v = await transformObj(obj)
    expect(v).toEqual(expect.objectContaining(expectObj))
  })

  test('Extracting errors from a transformed object', async () => {
    let transformFuns = {
      a: ()=> new Error('A'),
      b: {
        c: {
          d: () => new Error('b.c.d')
        }
      }
    }

    let expectObj = {
      a: new Error('A'),
      'b.c.d': new Error('b.c.d')
    }

    let transformObj = transformKeys(transformFuns)
    let v = await transformObj({})
    // expect(conformTransformed(v)).toEqual(expect.objectContaining())

    try {
      conformTransformed(v)
      throw new Error('Test failed to throw')
    }
    catch(e){
      expect(e).toEqual(expect.any(ConformError))
      expect(isConformError(e)).toBeTruthy()
    }
  })

  test('No Errors', async () => {
    let transformFuns = {
      a: (val, src)=> 'A',
      b: {
        c: {
          d: () => 'D'
        }
      }
    }

    let expectObj = {
      a: 'A',
      b: {
        c: {
          d: 'D'
        }
      }
    }

    let transformObj = transformKeys(transformFuns)
    let v = await transformObj({})
    expect(conformTransformed(v)).toEqual(expect.objectContaining(expectObj))
  })

  test('Constants', async () => {
    let transformConstants = {
      a: 'A',
      b: {
        c: {
          d: 'D'
        }
      }
    }

    let expectObj = {
      a: 'A',
      b: {
        c: {
          d: 'D'
        }
      }
    }

    let transformObj = transformKeys(transformConstants)
    let v = await transformObj({})
    expect(conformTransformed(v)).toEqual(expect.objectContaining(expectObj))
  })
})