/**
 * @file conformDeep
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {ConformDeepError, DeepConform, TypeOrErr} from "../src/conformDeep";

describe('conformDeep', () => {
  test('Validation Usage', async () => {
    let configObj = {player: {name: 'bob', age: 17}, profile: {rank: 10, score: 1000}}

    let playerValidatorFns = {
      name: (name : string, srcConfig) : TypeOrErr<string> => name,
      age: (age, config) => age
    }

    let profileValidatorFuns = {
      rank: (rank, config) => rank,
      score: (score, config) => score
    }
    let playerValidatorFn = {
      player: playerValidatorFns,
      profile: profileValidatorFuns
    }
    let objectValidator = DeepConform(playerValidatorFn)


    let v = await objectValidator(configObj)

    expect(v).toEqual(expect.objectContaining(configObj))

  })

  test('Setting Defaults.', async() => {
    let configObj = {}

    let playerValidatorFns = {
      name: (name, config) => name ? name : 'bob',
      age: (age, config) => age ? age : 16
    }
    let profileValidatorFuns = {
      rank: (rank, config) => rank ? rank : 100,
      score: (score, config) => score ? score: 0
    }
    let playerValidatorFn = {
      player: playerValidatorFns,
      profile: profileValidatorFuns
    }
    let objectValidator = DeepConform(playerValidatorFn)


    let v = await objectValidator(configObj)

    expect(v).toEqual(expect.objectContaining(configObj))

  })

  test('Handles promises in validator fns', async () => {
    let configObj = {player: {name: 'bob', age: 17}, profile: {rank: 10, score: 1000}}

    let playerValidatorFns = {
      name: (name, config) => Promise.resolve(name),
      age: (age, config) => Promise.resolve(age)
    }
    let profileValidatorFuns = {
      rank: (rank, config) => Promise.resolve(rank),
      score: (score, config) => Promise.resolve(score)
    }
    let playerValidatorFn = {
      player: playerValidatorFns,
      profile: profileValidatorFuns
    }
    let objectValidator = DeepConform(playerValidatorFn)


    let v = await objectValidator(configObj)

    expect(v).toEqual(expect.objectContaining(configObj))

  })
  test('Creates an object validator function from a provided object validator object', async () => {
    let objectValidatorFuns = {
      name: (name, config) => {
        return name
      },
      age: (age, config) => {
        return age * 2
      }
    }

    let objectValidator = DeepConform(objectValidatorFuns)

    let n = {name: 'bob', age: 10}
    let v = await objectValidator(n)
    expect(v).toEqual(expect.objectContaining({name: 'bob', age: 20}))
  })

  test('Finds Errors', async () => {
    let objectValidatorFuns = {
      name: (name) => {
        throw new Error('This is an error')
      },
      err: (age, config) => new Error()
    }

    let objectValidator = DeepConform(objectValidatorFuns)

    let n = {name: 'bob'}
    try {
      let v = await objectValidator(n)
    }
    catch(e){
      expect(e).toEqual(expect.any(ConformDeepError))
      expect(e.validationErrors).toEqual(expect.objectContaining({name: expect.any(Error), err: expect.any(Error)}))
    }
  })

  test('Nested validators', async () => {

    let objectValidatorFuns = {
      name: (name) => name,
      stats: {
        age: (age) => age,
        birthday: (birthday) => birthday
      }
    }

    let objectValidator = DeepConform(objectValidatorFuns)

    let n = {name: 'bob', stats: {age: 10, birthday: 20}}
    let v = await objectValidator(n)
    expect(v).toEqual(expect.objectContaining(n))

  })

  test('Nested Validator Errors', async () => {

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

    let objectValidator = DeepConform(objectValidatorFuns)

    let n = {name: 'bob', stats: {age: 10, birthday: 20}}

    try {
      let v = await objectValidator(n)
    }
    catch(e){
      expect(e).toEqual(expect.any(ConformDeepError))
      expect(e.validationErrors).toEqual(expect.objectContaining({'stats.birthday': expect.any(Error)}))
    }
  })

  test('Deep Nested Validators', async() => {

    let innerValidatorFns = {
      a: (a) => {
        return a
      },
      b: (b) => {
        return b
      },
      c: {
        d: (d) => {
          return d
        }
      }
    }

    let innerValidator = DeepConform(innerValidatorFns)

    let objectValidatorFuns = {
      name: (name) => name,
      stats: {
        age: (age) => age,
        birthday: (birthday) =>  birthday,
        nested: {
          a: (a) => a,
          b: (b) => b,
          c: {
            d: (d) => d
          }
        }
      }
    }

    let objectValidator = DeepConform(objectValidatorFuns)

    let n = {name: 'bob', stats: {age: 10, birthday: 20, nested: {a:1, b: 2, c: {d: 3}}}}
    let v = await objectValidator(n)

    expect(v).toEqual(expect.objectContaining(n))

  })

  test('Constant Value in validation object', async () => {
    let configObj = {name: 'Bob', age: 20}

    let constants = {
      name: 'Bob',
      age: 20
    }


    let objectValidator = DeepConform(constants)

    let v = await objectValidator(configObj)
    expect(v).toEqual(expect.objectContaining(configObj))

  })
})