import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions, selectors } from 'state/interface'
import { PlainButton } from 'ui/elements'
import { BackIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'

const Preset = ({ navigateBack, project = {}, contentType }) => (
  <Fragment>
    <PlainButton onClick={ navigateBack.bind(null, project.identifier) }>
      <BackIcon />
    </PlainButton>
    <PageTitle>{ contentType }</PageTitle>
  </Fragment>
)

export default connect(
  (state) => {
    const { identifier, contentType } = selectors.currentParams(state)

    return {
      project: selectors.findProjectByIdentifier(state, identifier),
      contentType: contentType && contentType.replace('_', '/')
    }
  },
  mapDispatch({
    navigateBack: (identifier) => actions.requestLocation(`/projects/${ identifier }`)
  })
)(Preset)
