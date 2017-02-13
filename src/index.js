import React from 'react'

class SwipeMe extends React.Component {
    constructor (props, context) {
        super(props)
        this.state({
            originalX: 0,
            originalY: 0
        })
    }

    onTouchStart (e) {
        const touch = e.changedTouches[0]
        const clientOffset = this.getClientOffset()
        const current = this.getCurrentPosition(touch)

        if (current.x < clientOffset.x && current.y < clientOffset.y) return

        this.setState({
            originalX: current.x,
            originalY: current.y
        })

        this.props.onTouchStart && this.props.onTouchStart(e)
    }

    onTouchMove (e) {
        const touch = e.changedTouches[0]
        const delta = this.getDelta(touch)
        const current = this.getCurrentPosition(touch)
        
        this.props.onSwiping(e, this.state.originalX, this.state.originalY, current.x, current.y, delta.x, delta.y)
        this.props.onTouchMove && this.props.onTouchMove(e)
    }

    onTouchEnd (e) {
        const touch = e.changedTouches[0]
        const delta = this.getDelta(touch)
        const current = this.getCurrentPosition(touch)

        if (delta.x > 0 && Math.abs(delta.x) > this.props.threshold) {
            this.props.onSwipedRight(e, this.state.originalX, current.x)
        } else {
            this.props.onSwipedLeft(e, this.state.originalX, current.x)
        }

        if (delta.y > 0 && Math.abs(delta.y) > this.props.threshold) {
            this.props.onSwipedDown(e, this.state.originalY, current.y)
        } else {
            this.props.onSwipedUp(e, this.state.originalY, current.y)
        }

        this.props.onSwiped(e, this.state.originalX, this.state.originalY, current.x, current.y, delta.x, delta.y)

        this.state({ originalX: 0, originalY: 0 })
        this.props.onTouchEnd && this.props.onTouchEnd(e)
    }

    getScreenOffset () {
        return  {
            x: this.props.screenXOffset || 0,
            y: this.props.screenYOffset || 0
        }
    }

    getCurrentPosition (touch) {
        return {
            x: parseInt(touch.screenX),
            y: parseInt(touch.screenY)
        }
    }

    getDelta (touch) {
        return {
            x: parseInt(touch.screenX) - this.state.originalX,
            y: parseInt(touch.screenY) - this.state.originalY
        }
    }

    getModifiedProps () {
        return {
            ...this.props,
            onTouchStart: this.onTouchStart,
            onTouchEnd: this.onTouchEnd,
            onTouchMove: this.onTouchMove
        }
    }

    render () {
        const props = this.getModifiedProps()
        return React.createElement(
            this.props.nodeName,
            [props],
            [...this.props.children]
         )
    }
}

SwipeMe.defaultProps = {
    threshold: 10,
}

SwipeMe.propTypes = {
    children: React.PropTypes.element.isRequired,
    screenXOffset: React.PropTypes.number,
    screenYOffset: React.PropTypes.number,
    onTouchStart: React.PropTypes.func,
    onTouchMove: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onSwiping: React.PropTypes.func,
    onSwiped: React.PropTypes.func,
    onSwipedUp: React.PropTypes.func,
    onSwipedDown: React.PropTypes.func,
    onSwipedLeft: React.PropTypes.func,
    onSwipedRight: React.PropTypes.func,
    nodeName: React.PropTypes.string,
    threshold: React.PropTypes.number,
}

export default SwipeMe