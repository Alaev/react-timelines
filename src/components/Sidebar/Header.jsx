import React from 'react'
import PropTypes from 'prop-types'
import { propTypeTimebar } from '../../propTypes'

const Header = ({ timebar: { rows }, sticky: { isSticky, sidebarWidth, headerHeight } = {} }) => (
  <div style={isSticky ? { paddingTop: headerHeight } : {}}>
    <div
      className={`rt-sidebar__header ${isSticky ? 'is-sticky' : ''}`}
      style={isSticky ? { width: sidebarWidth } : {}}
    >
      {
        rows.map(({ id, title }) =>
          <div key={id} className="rt-timebar-key">{title}</div>
        )
      }
    </div>
  </div>
)

Header.propTypes = {
  sticky: PropTypes.shape({
    isSticky: PropTypes.bool.isRequired,
    headerHeight: PropTypes.number.isRequired,
    sidebarWidth: PropTypes.number.isRequired
  }),
  timebar: propTypeTimebar.isRequired
}

export default Header
