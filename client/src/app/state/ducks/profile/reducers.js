import { combineReducers } from 'redux'
import createReducer from 'state/helpers/create-reducer'

import * as types from './types'

export default combineReducers({
  changePassword: createReducer(null)({
    [types.FETCH_PASSWORD_COMPLETED]: (state, action) => action.payload,
  })
})
