import React from 'react'
import { FieldArray } from 'redux-form'
import styled from 'styled-components'

import { AddIcon, TrashIcon } from 'ui/icons'
import { Button } from 'ui/elements'
import { TextBox } from 'views/common/form'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 40px;
  column-gap: 8px
  & > * {
    min-width: 0;
    min-height: 0;
  }
  position: relative;
`

const CustomHeaderList = ({
  fields,
  idle
}) => (
  fields.map(
    (header, index) => (
      <Wrapper key={ index }>
        <TextBox
          disabled={ !idle }
          label="Header Name"
          type="text"
          name={ `${ header }.name` }
          placeholder="X-Pull"
        />
        <TextBox
          disabled={ !idle }
          label="Header Value"
          type="text"
          name={ `${ header }.value` }
          placeholder="Media CDN"
        />
        { index === fields.length - 1 ?
          <Button
            disabled={ !idle }
            plain
            onClick={ () => fields.push({}) }
          >
            <AddIcon />
          </Button> :
          <Button
            disabled={ !idle }
            plain
            onClick={ () => fields.remove(index) }
          >
            <TrashIcon />
          </Button>
        }
      </Wrapper>
    )
  )
)

const CustomHeader = ({ idle }) => (
  <FieldArray
    idle={ idle }
    name="headers"
    component={ CustomHeaderList }
  />
)

export default CustomHeader
