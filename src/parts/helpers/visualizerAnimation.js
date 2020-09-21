import findShortestPathByBFS from "./algorithms/bfsPathFinder";

//decrease timegap for faster animation
let timegap = 20

const findPath = function(component){
    if(component.state.selectedNumber<2)
        return;
    let newGrid = component.state.grid;
    let path = findShortestPathByBFS(component, component.state.source, newGrid);
    console.log(path)
    for(let i=1;i<path.length-1;i++){
        setTimeout(() => {
            component.setState({grid:newGrid}, () => {
                newGrid[path[i].x][path[i].y] = "explored";
            });
        },timegap*i);
    }

    setTimeout(() => {
        for(let i=component.state.destination[0]+1;i<=component.state.source[0];i++){
            newGrid[i][component.state.destination[1]] = newGrid[i][component.state.destination[1]]==="selected"?"source":"selected";
        }
        for(let i=component.state.destination[1]+1;i<component.state.source[1];i++){
            newGrid[component.state.source[0]][i] = newGrid[component.state.source[0]][i]==="selected"?"source":"selected";
        }
        component.setState({grid:newGrid})
        setInterval(() => {
            for(let i=component.state.destination[0]+1;i<=component.state.source[0];i++){
                newGrid[i][component.state.destination[1]] = newGrid[i][component.state.destination[1]]==="selected"?"source":"selected";
            }
            for(let i=component.state.destination[1]+1;i<component.state.source[1];i++){
                newGrid[component.state.source[0]][i] = newGrid[component.state.source[0]][i]==="selected"?"source":"selected";
            }
            component.setState({grid:newGrid})
        },200)
    },timegap*path.length);
}

const rewindFindPath = (component) => {
    if(component.state.selectedNumber<2)
        return;
    let newGrid = component.state.grid;
    let path = findShortestPathByBFS(component, component.state.source, newGrid);
    for(let i=component.state.destination[0]+1;i<=component.state.source[0];i++){
        newGrid[i][component.state.destination[1]] = "explored";
    }
    for(let i=component.state.destination[1];i<component.state.source[1];i++){
        newGrid[component.state.source[0]][i] = "explored";
    }
    component.setState({grid:newGrid})
    for(let i=path.length-2,j=1;i>=1;i--,j++){
        setTimeout(() => {
            component.setState({grid:newGrid}, () => {
                newGrid[path[i].x][path[i].y] = "unselected";
            });
        },timegap*j);
    }

    setTimeout(() => {
        component.resetGrid();
    },timegap*path.length);
}

const historyPrinter = (component) => {
    let path = component.state.printQueue
    console.log(path)
    let newGrid = component.state.grid;
    for(let i=1;i<path.length-1;i++){
        setTimeout(() => {
            component.setState({grid:newGrid}, () => {
                newGrid[path[i].x][path[i].y] = "blocked";
            });
        },30*i);
    }
}

export { findPath, rewindFindPath, historyPrinter};


//
// findPath = () => {
//     if(this.state.selectedNumber<2)
//         return;
//     let timegap = 50
//     let newGrid = this.state.grid;
//     let path = findShortestPath(this, this.state.source, newGrid);
//     console.log(path)
//     for(let i=1;i<path.length-1;i++){
//         setTimeout(() => {
//             this.setState({grid:newGrid}, () => {
//                 newGrid[path[i].x][path[i].y] = "explored";
//             });
//         },timegap*i);
//     }
//
//     setTimeout(() => {
//         for(let i=this.state.destination[0]+1;i<=this.state.source[0];i++){
//             newGrid[i][this.state.destination[1]] = "selected";
//         }
//         for(let i=this.state.destination[1];i<this.state.source[1];i++){
//             newGrid[this.state.source[0]][i] = "selected";
//         }
//         this.setState({grid:newGrid})
//     },timegap*path.length);
// }
//
// rewindFindPath = () => {
//     if(this.state.selectedNumber<2)
//         return;
//     let timegap = 50
//     let newGrid = this.state.grid;
//     let path = this.findShortestPath(this.state.source, newGrid);
//     for(let i=this.state.destination[0]+1;i<=this.state.source[0];i++){
//         newGrid[i][this.state.destination[1]] = "explored";
//     }
//     for(let i=this.state.destination[1];i<this.state.source[1];i++){
//         newGrid[this.state.source[0]][i] = "explored";
//     }
//     this.setState({grid:newGrid})
//     for(let i=path.length-2,j=1;i>=1;i--,j++){
//         setTimeout(() => {
//             this.setState({grid:newGrid}, () => {
//                 newGrid[path[i].x][path[i].y] = "unselected";
//             });
//         },timegap*j);
//     }
//
//     setTimeout(() => {
//         this.resetGrid();
//     },timegap*path.length);
// }