import React from 'react';

// Helpers
import bindMethods from '../lib/bindMethods';

// Data
import data from '../configs/data';

// Components
import Reel from './Reel';
import Output from './Output';
import Lever from './Lever';

class Home extends React.Component {
	constructor(props) {
        super(props);
        
        bindMethods(this, ['handleleverpull','handlefinish','handleCheat']);

        this.state = {
        	selected: [],
        	defaults: [data.coffee.img, data.tea.img, data.espresso.img],
        	winningDrink: false,
        	reelsRotated: 0,
        	running: false,
        	reels: [[data.coffee.maker, data.tea.maker, data.espresso.maker ],
        			[data.coffee.filter, data.tea.filter, data.espresso.filter],
        			[data.coffee.beans, data.tea.beans, data.espresso.beans]
        		]
        };
    }

    handleleverpull() {
    	const randomPattern = [ Math.floor(Math.random() * 3), Math.floor(Math.random() * 3), Math.floor(Math.random() * 3) ];
    	const reels = this.state.reels;
    	
    	let winningBeverageIndex = -1;
    	if (randomPattern[0] ===  randomPattern[1] &&  randomPattern[1] ===  randomPattern[2]) {
    		winningBeverageIndex = randomPattern[0] == 0 ? 0 : randomPattern[1] == 1 ? 1 : 2
    	}

    	React.findDOMNode(this.refs.audio).play();

    	this.setState({
    		running: true,
    		winningDrink: winningBeverageIndex > -1 ? this.state.defaults[winningBeverageIndex] : false,
    		selected: [ reels[0][randomPattern[0]], reels[1][randomPattern[1]], reels[2][randomPattern[2]] ]
        });
    }

    handlefinish() {
    	if (this.state.reelsRotated == 3) {
    		React.findDOMNode(this.refs.audio).pause();
    		this.setState({
    			running : false
        	});
    	} else {
    		this.setState({
    			reelsRotated : this.state.reelsRotated + 1
        	});
    	}
    }

    handleCheat() {
    	const winningBeverageIndex = Math.floor(Math.random() * 3);
    	const reels = this.state.reels;
    	
    	React.findDOMNode(this.refs.audio).play();

    	this.setState({
    		running: true,
    		winningDrink: this.state.defaults[winningBeverageIndex],
    		selected: [ reels[0][winningBeverageIndex], reels[1][winningBeverageIndex], reels[2][winningBeverageIndex] ]
        });

    }

    render() {
    	const { reels, running, defaults, winningDrink } = this.state;
    	const selected = !running ? defaults : this.state.selected;

        return (
			<div className="slot">
				<Reel 
					reels={reels[0]}
					roundsBeforeReveal={1}
					running={running}
					selected={selected[0]}
					speed={3}
					handlefinish={this.handlefinish}
					leftPos='85px'/>
				<Reel 
					reels={reels[1]} 
					roundsBeforeReveal={4} 
					running={running} 
					selected={selected[1]}
					speed={2}
					handlefinish={this.handlefinish}
					leftPos='140px'/>
				<Reel 
					reels={reels[2]}
					roundsBeforeReveal={7}
					running={running}
					selected={selected[2]}
					speed={1.5}
					handlefinish={this.handlefinish}
					leftPos='190px'/>
				<Lever handlePull={this.handleleverpull} handleCheat={this.handleCheat}/>
				<audio ref='audio' autoStart={0} autoPlay={0}>
					<source src="/public/js/7a3219f46e0f5a3211676048e7734217.mp3" type="audio/mpeg"/>
					Your browser does not support the audio element.
				</audio>
				<Output running={running} winningDrink={winningDrink}/>
			</div>
        );
    }
}

export default Home;
