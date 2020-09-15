import React from 'react';
import styles from './Cell.css'

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {phase:""};
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.phase!==prevState.phase){
            return { phase: nextProps.phase};
        }
        else return null;
    }

    render() {
        return (
                <button onMouseEnter={this.props.onMouseEnter} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp} className={'cellStyle '+this.state.phase} />
        );
    }
}

export default Cell;