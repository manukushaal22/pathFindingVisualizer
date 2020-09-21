import React from 'react';
import styles from './Cell.css'

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phase:"",
            cellSize:""
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.phase!==prevState.phase){
            if(nextProps.cellSize!==prevState.cellSize){
                return { phase: nextProps.phase, cellSize: nextProps.cellSize};
            }
            return { phase: nextProps.phase};
        }
        if(nextProps.cellSize!==prevState.cellSize){
            return { cellSize: nextProps.cellSize};
        }
        else return null;
    }

    render() {
        let cellStyle = {
            height: this.state.cellSize.toString()+'vh',
            width: this.state.cellSize.toString()+'vh'
        };
        return (
                <button onMouseEnter={this.props.onMouseEnter} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp} className={'cellStyle '+this.state.phase} style={cellStyle} />
        );
    }
}

export default Cell;