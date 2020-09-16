import React from 'react';
import Cell from "./Cell";
import { findPath, rewindFindPath, historyPrinter} from "./helpers/visualizerAnimation";

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            source: [],
            destination: [],
            selectedNumber: 0,
            isMouseDown: false,
            printQueue: []
        };
    }

    componentDidMount(){
        this.resetGrid(this.props.rows,this.props.cols);
    }

    clearHistory = () => {
        this.setState({printQueue:[]})
        this.resetGrid();
    }

    resetGrid = (rows,cols) => {
        let grid = [];
        for(let i = 0; i < rows; i++){
            let row = [];
            for(let j = 0; j < cols; j++){
                row.push("unselected");
            }
            grid.push(row);
        }
        this.setState({
            grid:grid,
            source: [],
            destination: [],
            selectedNumber: 0
        })
    }

    clicked = (i,j) => {
        this.setState({isMouseDown:true});
        //changing grid data
        let newGrid = this.state.grid;
        if (newGrid[i][j] !== "unselected") {
            newGrid[i][j] = "unselected"
            let pq = this.state.printQueue;
            pq.pop()
            this.setState({
                grid: newGrid,
                selectedNumber: this.state.selectedNumber - 1,
                printQueue: pq
            });
        } else if(this.state.grid[i][j] === "unselected" && this.state.selectedNumber < 2) {
            //setting source and destination
            let source = this.state.source, destination = this.state.destination;
            if(this.state.selectedNumber === 0){
                source = [i,j];
                newGrid[i][j] = "source";
            }
            if(this.state.selectedNumber === 1){
                destination = [i,j];
                newGrid[i][j] = "destination";
            }
            let pq = this.state.printQueue;
            pq.push({x:i,y:j})
            this.setState({
                grid: newGrid,
                selectedNumber: this.state.selectedNumber + 1,
                source: source,
                destination: destination,
                printQueue: pq
            });
        }else if(this.state.grid[i][j] === "unselected" && this.state.selectedNumber >= 2) {
           this.blockTheCell(i,j);
        }
    }

    setMouseStateUp = () => {
        this.setState({isMouseDown:false})
    }

    mouseEntered = (i,j) => {
        if(this.state.isMouseDown && this.state.grid[i][j] === "unselected" && this.state.selectedNumber >= 2) {
            this.blockTheCell(i,j)
        }
    }

    blockTheCell = (i,j) => {
        //setting blocks
        let newGrid = this.state.grid;
        newGrid[i][j] = "blocked";
        let pq = this.state.printQueue;
        pq.push({x:i,y:j})
        this.setState({
            grid: newGrid,
            selectedNumber: this.state.selectedNumber + 1,
            printQueue: pq
        });
    }

    processGrid = () => {
        let rows = [];
        for(let i = 0; i < this.state.grid.length; i++) {
            let row = [];
            for (let j = 0; j < this.state.grid[0].length; j++) {
                row.push(<Cell onMouseEnter={() => this.mouseEntered(i,j)} onMouseUp={this.setMouseStateUp} onMouseDown={()=>this.clicked(i,j)} phase={this.state.grid[i][j]}/>);
            }
            rows.push(<div style={{flex: 1, flexDirection: "row"}}>{row}</div>);
        }
        return (<div>{rows}</div>);
    }

    render() {
        
        return (
            <div>
                {this.processGrid()}
                <br/>
                <button onClick={()=>findPath(this)}>Find Path</button>
                <button onClick={() => this.resetGrid(this.props.rows,this.props.cols)}>Reset Grid</button>
                <button onClick={()=>rewindFindPath(this)}>Rewind</button>
                <button onClick={()=>historyPrinter(this)}>Print History</button>
                <button onClick={() => this.clearHistory}>Clear History</button>
            </div>
        );
    }
}

export default Grid;