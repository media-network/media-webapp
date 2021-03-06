import { all, fork, put, race, select, take } from 'redux-saga/effects'

import { addToast } from 'state/saga/toast'
import { actions, selectors, types } from 'state/interface'
import * as Preset from 'views/pages/preset'

const watchGetPreset = function*(path) {
  const { completed, failed } = yield race({
    completed: take(types.preset.GET_COMPLETED),
    failed: take(types.preset.GET_FAILED)
  })

  const { identifier } = yield select(selectors.currentParams)

  if (failed) {
    yield all ([
      yield fork(addToast, {
        type: 'error',
        message: 'Preset does not exist or internet connection has error(s).'
      }),
      put(
        actions.requestLocation(`/projects/${ identifier }`)
      )
    ])
  }

  yield put(
    actions.mergeUIState(path, {
      idle: true
    })
  )

}

const watchRemovePreset = function*(path) {
  while (true) {
    yield take(`${ types.dialog.SHOW}:REMOVE_PRESET`)

    yield put(
      actions.mergeUIState(path, {
        isRemovePresetDialogActive: true
      })
    )

    const { hide } = yield race({
      hide: take(`${ types.dialog.HIDE }:REMOVE_PRESET`),
      remove: take(types.preset.REMOVE)
    })

    yield put(
      actions.mergeUIState(path, {
        isRemovePresetDialogActive: false
      })
    )

    if (hide) {
      continue
    }

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { removeCompleted, removeFailed } = yield race({
      removeCompleted: take(types.preset.REMOVE_COMPLETED),
      removeFailed: take(types.preset.REMOVE_FAILED)
    })

    const { identifier } = yield select(selectors.currentParams)

    yield put(
      actions.mergeUIState(path, {
        idle: true
      })
    )

    if (removeCompleted) {
      yield all ([
        fork(addToast, {
          expiring: '5s',
          type: 'success',
          message: 'Preset has been removed.'
        }),
        put(
          actions.requestLocation(`/projects/${ identifier }`)
        )
      ])
    }

    if (removeFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Failed to remove the preset'
      })
    }
  }
}

const watchUpdatePreset = function*(path) {
  while (true) {
    const action = yield take(`${ types.dialog.SHOW }:UPDATE_PRESET`)

    yield put(
      actions.mergeUIState(path, {
        isUpdatePresetDialogActive: action.payload.params
      })
    )

    const { hide } = yield race({
      hide: take(`${ types.dialog.HIDE }:UPDATE_PRESET`),
      update: take(types.preset.UPDATE)
    })

    yield put(
      actions.mergeUIState(path, {
        isUpdatePresetDialogActive: false
      })
    )

    if (hide) {
      continue
    }

    yield put(
      actions.mergeUIState(path, {
        idle: false
      })
    )

    const { updateCompleted, updateFailed } = yield race({
      updateCompleted: take(types.preset.UPDATE_COMPLETED),
      updateFailed: take(types.preset.UPDATE_FAILED)
    })

    yield put(
      actions.mergeUIState(path, {
        idle: true
      })
    )

    if (updateCompleted) {
      yield fork(addToast, {
        expiring: '5s',
        type: 'success',
        message: 'Preset has been updated.'
      })
    }

    if (updateFailed) {
      yield fork(addToast, {
        type: 'error',
        message: 'Cannot update the preset. Please check your network connection and try again.'
      })
    }
  }
}

export default {
  '/projects/:identifier/presets/:contentType': {
    component: Preset,
    exact: true,
    *state(path) {
      yield fork(watchGetPreset, path)
      yield fork(watchRemovePreset, path)
      yield fork(watchUpdatePreset, path)

      const { contentType, identifier } = yield select(selectors.currentParams)

      yield all([
        put(
          actions.getProject(identifier)
        ),
        put(
          actions.getPreset({
            identifier,
            contentType: contentType.replace('_', '/')
          })
        ),
        put(
          actions.initializeUIState(path, {
            idle: false,
            isRemovePresetDialogActive: false,
            isUpdatePresetDialogActive: false
          })
        )
      ])
    }
  }
}
