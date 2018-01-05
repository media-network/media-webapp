import prefix from 'helpers/vendor-prefix'
import { FONT_SIZE } from 'styles/constants'
import { columnLayout } from 'styles/layout'

export default prefix({
  wrapper: {
    ...columnLayout.wrapper,
    maxWidth: '900px'
  },
  project: {
    ...columnLayout.column,
    minWidth: '300px'
  }
})

export const form = prefix({
  row: {
    display: 'flex',
    marginBottom: '15px',
    flexDirection: 'column'
  },
  label: {
    marginRight: 'auto'
  },
  desc: {
    marginTop: '5px',
    fontSize: FONT_SIZE.smallx
  }
})
