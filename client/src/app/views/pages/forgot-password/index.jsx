import React, { Fragment } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { Container, Description, Header, Link, Paragraph } from 'ui/elements'
import { ErrorBox, SuccessBox } from 'ui/elements'
import { actions } from 'state/interface'
import { mapDispatch } from 'services/redux-helpers'
import { stateful } from 'views/common/decorators'

import _ForgotPasswordForm from './forgot-password-form'

const ForgotPasswordForm = reduxForm({
  form: 'forgotPassword',
  enableReinitialize: true
})(_ForgotPasswordForm)

const ForgotPassword=({
  forgotPassword,
  toSignIn,
  ui: {
    errorForgotPassword,
    resultForgotPassword
  }
}) => (
  <main>
    <Container center size="small">
      { resultForgotPassword &&
        <SuccessBox>We&apos;ve send a password reset link to your email. Please check your inbox.</SuccessBox>
      }
      { errorForgotPassword &&
        <ErrorBox>Fail to send the reset password email or the account does not exist.</ErrorBox>
      }
      { !resultForgotPassword &&
        <Fragment>
          <Paragraph>Enter your email address</Paragraph>
          <ForgotPasswordForm onSubmit={ forgotPassword } />
        </Fragment>
      }
      <Paragraph>
        <Link href='/sign-in' onClick={ toSignIn }>Back to sign in</Link>
      </Paragraph>
    </Container>
  </main>
)

export default stateful({
  component: 'ResetPassword'
})(
  connect(
    null,
    mapDispatch({
      forgotPassword: email => actions.forgotPassword(email),
      toSignIn: () => actions.requestLocation('/sign-in')
    })
  )(ForgotPassword)
)
