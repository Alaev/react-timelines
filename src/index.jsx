import React, { PropTypes, Component } from 'react'

import Controls from './components/Controls'
import Sidebar from './components/Sidebar'
import Timeline from './components/Timeline'
import createTime from './utils/time'

class Container extends Component {

  constructor(props) {
    super(props)
    this.state = {
      time: createTime(props.scale)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scale !== this.props.scale) {
      this.setState({ time: createTime(nextProps.scale) })
    }
  }

  render() {
    const {
      isOpen,
      tracks,
      now,
      timebar,
      toggleOpen,
      highlightTrack,
      toggleTrackOpen,
      zoomIn,
      zoomOut,
      scale
    } = this.props
    const { time } = this.state
    return (
      <div className="react-timeline">
        <Controls
          isOpen={isOpen}
          toggleOpen={toggleOpen}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          zoom={scale.zoom}
          zoomMin={scale.zoomMin}
          zoomMax={scale.zoomMax}
        />
        <div className={`layout ${isOpen ? 'is-open' : ''}`}>
          <div className="layout__side">
            <Sidebar
              timebar={timebar}
              tracks={tracks}
              highlightTrack={highlightTrack}
              toggleTrackOpen={toggleTrackOpen}
            />
          </div>
          <div className="layout__main">
            <Timeline
              now={now}
              time={time}
              timebar={timebar}
              tracks={tracks}
            />
          </div>
        </div>
      </div>
    )
  }
}

Container.propTypes = {
  now: PropTypes.instanceOf(Date),
  scale: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool.isRequired,
  timebar: PropTypes.shape({}).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggleOpen: PropTypes.func.isRequired,
  highlightTrack: PropTypes.func,
  toggleTrackOpen: PropTypes.func,
  zoomIn: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired
}

export default Container
