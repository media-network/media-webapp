import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { mapDispatch } from 'services/redux-helpers'
import { actions } from 'state/interface'
import { Button } from 'ui/elements'
import { BackIcon } from 'ui/icons'
import { PageTitle } from 'ui/typo'

const CreateProject = ({ navigateBack }) => (
  <Fragment>
    <Button onClick={ navigateBack }>
      <BackIcon />
    </Button>
    <PageTitle>Create Project</PageTitle>
  </Fragment>
)

export default connect(
  null,
  mapDispatch({
    navigateBack: () => actions.requestLocation('/projects')
  })
)(CreateProject)
