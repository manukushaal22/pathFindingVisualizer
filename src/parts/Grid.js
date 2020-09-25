import React from 'react';
import Cell from "./Cell";
import Button from "@material-ui/core/Button";
import { findPath, rewindFindPath, historyPrinter} from "./helpers/visualizerAnimation";

class Grid extends React.Component {

    constructor(props) {
        super(props);
        let cellSize = 50/props.size;
        this.state = {
            grid: [],
            source: [],
            destination: [],
            selectedNumber: 0,
            isMouseDown: false,
            printQueue: [],
            cellSize: cellSize,
        };
    }

    componentDidMount(){
        this.resetGrid();
    }

    clearHistory = () => {
        this.setState({printQueue:[]})
        this.resetGrid();
    }

    resetGrid = () => {
        let grid = [];
        for(let i = 0; i < this.props.size; i++){
            let row = [];
            for(let j = 0; j < this.props.size; j++){
                row.push("unselected");
            }
            grid.push(row);
        }
        this.setState({
            grid:grid,
            source: [],
            destination: [],
            selectedNumber: 0
        });
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
            for (let j = 0; j < this.state.grid.length; j++) {
                row.push(<Cell onMouseEnter={() => this.mouseEntered(i,j)} onMouseUp={this.setMouseStateUp} onMouseDown={()=>this.clicked(i,j)} phase={this.state.grid[i][j]} cellSize={this.state.cellSize}/>);
            }
            rows.push(<div className={"cellRow"} style={{
                flex: 1,
                flexDirection: "row",
                margin: 0
            }}>{row}</div>);
        }
        return (<div className={"grid"}>{rows}</div>);
    }

    render() {
        return (
            <div>             
                {this.processGrid()}
                <br/>
                <div>
                    <Button style={{marginRight:"1.35vw"}} variant="contained" color="primary" onClick={()=>findPath(this)}>Find Path</Button>
                    <Button style={{marginRight:"1.35vw"}} variant="contained" color="primary" onClick={() => this.resetGrid()}>Reset Grid</Button>
                    <Button variant="contained" color="primary" onClick={()=>rewindFindPath(this)}>Rewind</Button>
                    {/* <Button variant="contained" color="primary" onClick={()=>historyPrinter(this)}>Print History</Button>
                    <Button variant="contained" color="primary" onClick={this.clearHistory}>Clear History</Button> */}
                </div>
            </div>
        );
    }
}

export default Grid;