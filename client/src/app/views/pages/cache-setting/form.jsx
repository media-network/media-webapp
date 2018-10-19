import React from 'react'

import { Form } from 'ui/compounds'
import { Button, Break } from 'ui/elements'
import { DescriptionText } from 'ui/typo'
import { TextBox } from 'views/common/form'
import { validatePositiveNumber, validateRequired } from 'views/common/validate'

const CacheSettingForm = ({
  handleSubmit,
  idle
}) => (
  <Form handleSubmit={ handleSubmit }>
    <TextBox
      disabled={ !idle }
      label="Expire time"
      name="expired"
      placeholder="Expire time"
      type="number"
      validate={ [ validateRequired, validatePositiveNumber ] }
    />
    <DescriptionText mostLeft mostRight>
      Expire time. (Must be numbers)
    </DescriptionText>
    <Break double />
    <Button
      disabled={ !idle }
      type="submit"
    >Save</Button>
  </Form>
)

export default CacheSettingForm