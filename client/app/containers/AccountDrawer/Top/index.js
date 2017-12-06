import Radium from 'radium'
import React from 'react'

import IconAvatar from 'react-icons/lib/io/image'

import style from './style'

@Radium
class Top extends React.PureComponent {
  render() {
    return (
      <div style={style.wrapper}>
        <div style={style.accountAvatar}>
          <IconAvatar size={48} />
        </div>
        <div style={style.accountInfo}>
          <h3 style={style.signedIn}>Signed in as</h3>
          <p style={style.accountName}>Luc Hoang Long</p>
        </div>
      </div>
    )
  }
}

export default Top
