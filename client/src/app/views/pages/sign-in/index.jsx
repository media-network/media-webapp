import React from 'react'
import { connect } from 'react-redux'

import { actions } from 'state/interface'

const SignIn = ({ signIn }) => (
  <div>
    <button onClick={ signIn }>Sign In</button>
  </div>
)

export default connect(
  null,
  dispatch => ({
    signIn: () => dispatch(actions.createSession('xxx'))
  })
)(SignIn)