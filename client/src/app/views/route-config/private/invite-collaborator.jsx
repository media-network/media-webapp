import { all, fork, put, take, race, select } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, selectors, types } from 'state/interface'
import * as InviteCollaborator from 'views/pages/invite-collaborator'

const watchGetProject = function*() {
  const { identifier } = yield select(selectors.currentParams)

  const { completed, failed } = yield race({
    completed: take(types.project.GET_COMPLETED),
    failed: take(types.project.GET_FAILED)
  })

  if (failed) {
    yield all([
      fork(addToast, {
        type: 'error',
        message: 'Cannot connect to project. Project does not exist or network has error(s).'
      }),
      put(
        actions.requestLocation('/projects')
      )
    ])
  }

  if (completed) {
    const { isActive, status } = completed.payload.project

    if (!(isActive === true && status === 'DEPLOYED')) {
      yield all([
        fork(addToast, {
          type: 'error',
          message: 'Project is initializing or disabled.'
        }),
        put(
          actions.requestLocation(`/projects/${ identifier }`)
        )
      ])
    }
  }
}

const watchInviteCollaborator = function*(path) {
  while (true) {
    yield take(types.project.INVITE_COLLABORATOR)

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { inviteCompleted, inviteFailed } = yield race({
      inviteCompleted: take(types.project.INVITE_COLLABORATOR_COMPLETED),
      inviteFailed: take(types.project.INVITE_COLLABORATOR_FAILED)
    })

    if (inviteCompleted) {
      yield all([
        fork(addToast, {
          expiring: '5s',
          type: 'success',
          message: 'Your invitations have been successfully sent.'
        }),
        put(
          actions.requestLocation(`/projects/${ inviteCompleted.payload.identifier }`)
        )
      ])
    }

    if (inviteFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Your invitation could not be sent. The email address(es) do not exist or network connection has error(s).'
      })
    }

    yield put(
      actions.replaceUIState(path, {
        idle: true
      })
    )
  }
}

export default {
  '/projects/:identifier/invite-collaborator': {
    component: InviteCollaborator,
    exact: true,
    *state(path) {
      yield fork(watchGetProject)
      yield fork(watchInviteCollaborator, path)

      const { identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getProject(identifier)
        ),
        put(
          actions.initializeUIState(path, {
            idle: true
          })
        )
      ])
    }
  }
}
