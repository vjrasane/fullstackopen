import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const expectActionResult = (type, expected, initial = initialState) => {
    const action = {
      type: type
    }
    const state = initial

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(expected)
  }

  it('should return a proper initial state when called with undefined state', () => {
    expectActionResult('DO_NOTHING', initialState, undefined)
  })

  it('good is incremented', () => {
    expectActionResult('GOOD',{
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  it('bad is incremented', () => {
    expectActionResult('BAD',{
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  it('ok is incremented', () => {
    expectActionResult('OK',{
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  it('zero clears counters', () => {
    expectActionResult('ZERO',{
      good: 0,
      ok: 0,
      bad: 0
    },{
      good: 100,
      ok: 100,
      bad: 100
    })
  })
})
