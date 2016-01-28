import React from 'react';

class Lever extends React.Component {

    render() {
        return (
            <div className="lever">
            	<input type="button" value="Spin" onClick={this.props.handlePull}/>
            	<input type="button" value="Cheat" onClick={this.props.handleCheat}/>
            </div>
        );
    }
}

export default Lever;