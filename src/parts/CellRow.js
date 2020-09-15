import React from 'react';
import Cell from "./Cell";

class CellRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {color: props.howMany};
    }

    makeCells = (n) => {
        let cells = [];
        for(let i = 0; i < n; i++){
            cells.push(<Cell color={"red"}/>);
        }
        return cells;
    }

    render() {
        return (
            <div style={{display:"table-cell"}}>
                {this.makeCells(this.props.howMany)}
            </div>
        );
    }
}

export default CellRow;