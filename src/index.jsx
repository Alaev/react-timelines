import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Controls from './components/Controls'
import Layout from './components/Layout'
import DefaultLayout from './components/Layout/Default'
import StickyLayout from './components/Layout/Sticky'
import createTime from './utils/time'

const scalePropType = PropTypes.shape({
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  zoom: PropTypes.number.isRequired,
  zoomMin: PropTypes.number,
  zoomMax: PropTypes.number
}).isRequired

const basePropTypes = {
  scale: scalePropType,
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func,
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func
}

const timelinePropTypes = {
  timebar: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  now: PropTypes.instanceOf(Date),
  toggleTrackOpen: PropTypes.func,
  clickElement: PropTypes.func,
  ...basePropTypes
}

class Base extends Component {
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

  renderControls() {
    const {
      isOpen = true,
      toggleOpen,
      zoomIn,
      zoomOut,
      scale: { zoom, zoomMin, zoomMax }
    } = this.props
    return (
      <Controls
        isOpen={isOpen}
        toggleOpen={toggleOpen}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        zoom={zoom}
        zoomMin={zoomMin}
        zoomMax={zoomMax}
      />
    )
  }
}

Base.propTypes = basePropTypes

class Timeline extends Base {
  render() {
    const EnhancedLayout = Layout(DefaultLayout)
    const {
      isOpen = true,
      tracks,
      now,
      timebar,
      toggleTrackOpen,
      scale,
      clickElement
    } = this.props
    return (
      <div className="rt">
        { this.renderControls() }
        <EnhancedLayout
          scale={scale}
          now={now}
          tracks={tracks}
          timebar={timebar}
          toggleTrackOpen={toggleTrackOpen}
          time={this.state.time}
          isOpen={isOpen}
          clickElement={clickElement}
        />
      </div>
    )
  }
}

Timeline.propTypes = timelinePropTypes

class StickyTimeline extends Base {
  render() {
    const EnhancedLayout = Layout(StickyLayout)
    const {
      isOpen = true,
      tracks,
      now,
      timebar,
      toggleTrackOpen,
      scale,
      clickElement
    } = this.props
    return (
      <div className="rt">
        { this.renderControls() }
        <EnhancedLayout
          scale={scale}
          now={now}
          tracks={tracks}
          timebar={timebar}
          toggleTrackOpen={toggleTrackOpen}
          time={this.state.time}
          isOpen={isOpen}
          clickElement={clickElement}
        />
      </div>
    )
  }
}

StickyTimeline.propTypes = timelinePropTypes

export { StickyTimeline }

export default Timeline
