import React from 'react';

// Helpers
import bindMethods from '../lib/bindMethods';

class Reel extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
        	top: 0,
        	selected: this.props.selected
        };
        bindMethods(this, ['handleSlider', 'renderImage']);
    }

    handleSlider() {
    	const { top, selected } = this.state;
    	const { roundsBeforeReveal, reels, handlefinish } = this.props;

		if (top < -525) {
			this.roundsBeforeReveal++;
		}

		if (this.roundsBeforeReveal > roundsBeforeReveal) {
			const selectedIndex = reels.indexOf(selected);
			if ( top == - (selectedIndex * 175)) {
				clearInterval(this.timer);
				handlefinish();
				return;
			}
		}

		this.setState({
			top: top < -525 ? 0 : top - 25
		});
    }

    componentDidMount() {
    	this.roundsBeforeReveal = null;
    	this.timer = null;
    }

    componentWillReceiveProps(nextProps) {
    	if (nextProps.running) {
    		this.timer = setInterval(this.handleSlider, 25 * this.props.speed);
    		this.roundsBeforeReveal = 0;
    		this.setState({
            	selected: nextProps.selected,
            	top: 0
        	});
    	}
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

	renderImage() {
		const { reels, running } = this.props;
		let img = null;
		img = reels.map( elm => <img src={elm} width="145px" height="175px"/> );
		// Adding 1st image at the end again for smoother looping
		img.push(<img src={reels[0]} width="145px" height="175px"/>);	
		return img;
	}
    
    render() {
    	const { reels, leftPos } = this.props;

        if (!reels) {
            return null;
        }

        const reelStyle = {
        	left: leftPos
        }
        const sliderStyle = {
        	top: this.state.top+'px'
        }

        return (
            <div style={reelStyle} className="reel">
            	<div style={sliderStyle} className="slider">
            		{this.renderImage()}
            	</div>
            </div>
        );
    }
}

export default Reel;