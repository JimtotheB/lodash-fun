/**
 * @file conformDeep
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project lodash-fun
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

import {ConformError,TypeOrErr, conformDeep, formatConformError} from "../src";

describe('conformDeep', () => {
  test('Validation Usage', async () => {
    let configObj = {player: {name: 'bob', age: 17}, profile: {rank: 10, score: 1000}}

    let playerValidatorFns = {
      name: (name : string, config) : TypeOrErr<string> => name,
      age: (age) => {
        return age
      }
    }

    let profileValidatorFuns = {
      rank: (rank, config) => rank,
      score: (score, config) => score
    }
    let playerValidatorFn = {
      player: playerValidatorFns,
      profile: profileValidatorFuns
    }
    let objectValidator = conformDeep(playerValidatorFn)


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
    let objectValidator = conformDeep(playerValidatorFn)


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
    let objectValidator = conformDeep(playerValidatorFn)


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

    let objectValidator = conformDeep(objectValidatorFuns)

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

    let objectValidator = conformDeep(objectValidatorFuns)

    let n = {name: 'bob'}
    try {
      let v = await objectValidator(n)
      throw new Error('Test failure')
    }
    catch(e){
      expect(e).toEqual(expect.any(ConformError))
      expect(e.validationErrors).toEqual(expect.objectContaining({name: expect.any(Error), err: expect.any(Error)}))
    }
  })

  test('Formats Errors', async () => {
    let objectValidatorFuns = {
      name: (name) => {
        throw new Error('This is an error')
      },
      other: {
        deep: () => {
          throw new Error('This is deep.')
        }
      }
    }

    let objectValidator = conformDeep(objectValidatorFuns)

    let n = {name: 'bob'}
    try {
      let v = await objectValidator(n)
      throw new Error('Test failure')
    }
    catch(e){
      let human = formatConformError(e)
      console.log(human)
      expect(human).toEqual(
        `name: This is an error\nother.deep: This is deep.`)
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

    let objectValidator = conformDeep(objectValidatorFuns)

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

    let objectValidator = conformDeep(objectValidatorFuns)

    let n = {name: 'bob', stats: {age: 10, birthday: 20}}

    try {
      let v = await objectValidator(n)
    }
    catch(e){
      expect(e).toEqual(expect.any(ConformError))
      expect(e.validationErrors).toEqual(expect.objectContaining({'stats.birthday': expect.any(Error)}))
    }
  })

  test('Deep Nested Validators', async() => {

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

    let objectValidator = conformDeep(objectValidatorFuns)

    let n = {name: 'bob', stats: {age: 10, birthday: 20, nested: {a:1, b: 2, c: {d: 3}}}}
    let v = await objectValidator(n)
    expect(v).toEqual(expect.objectContaining(n))

  })

  test('Second argument to validators is entire config object.', async() => {
    let n = {name: 'bob', stats: {age: 10, birthday: 20, nested: {a:1, b: 2, c: {d: 3}}}}
    let level1src = null
    let level2src = null
    let level3src = null

    let objectValidatorFuns = {
      name: (name, srcObj) => {
        level1src = srcObj
        return name
      },
      stats: {
        age: (age, srcObj) => {
          level2src = srcObj
          return age
        },
        birthday: (birthday) =>  birthday,
        nested: {
          a: (a) => a,
          b: (b) => b,
          c: {
            d: (d, srcObj) => {
              level3src = srcObj
              return d
            }
          }
        }
      }
    }

    let objectValidator = conformDeep(objectValidatorFuns)


    let v = await objectValidator(n)

    expect(v).toEqual(expect.objectContaining(n))
    expect(level1src).toEqual(expect.objectContaining(n))
    expect(level2src).toEqual(expect.objectContaining(n))
    expect(level3src).toEqual(expect.objectContaining(n))
  })

  test('Constant Value in validation object', async () => {
    let configObj = {name: 'Bob', age: 20}

    let constants = {
      name: 'Bob',
      age: 20
    }


    let objectValidator = conformDeep(constants)

    let v = await objectValidator(configObj)
    expect(v).toEqual(expect.objectContaining(configObj))

  })
})