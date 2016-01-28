import React from 'react';

class Output extends React.Component {

    render() {
    	if (this.props.running || !this.props.winningDrink ) return null;

        return (
            <div className="output">
            	<img width="145px" height="175px" src={this.props.winningDrink}/>
            </div>
        );
    }
}

export default Output;