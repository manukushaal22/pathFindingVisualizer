const findShortestPathbyBFS = function(component, source, grid) {
    let visited = [];
    for(let i = 0; i < component.props.rows; i++){
        let row = [];
        for(let j = 0; j < component.props.cols; j++){
            if(grid[i][j]=="blocked")
                row.push(true);
            else
                row.push(false)
        }
        visited.push(row);
    }
    console.log(visited)
    let sourceCell = {x:source[0], y:source[1]};
    let queue = [sourceCell];
    let path = []
    while( queue.length > 0 ){
        let currentCell = queue.shift();
        path.push(currentCell);
        visited[currentCell.x][currentCell.y] = true;
        let tmp = {x: currentCell.x, y: currentCell.y - 1}
        if(exploreCell(component, tmp, visited, path, queue, grid)) return path;
        tmp = {x: currentCell.x + 1, y: currentCell.y}
        if(exploreCell(component, tmp, visited, path, queue, grid)) return path;
        tmp = {x: currentCell.x, y: currentCell.y + 1}
        if(exploreCell(component, tmp, visited, path, queue, grid)) return path;
        tmp = {x: currentCell.x - 1, y: currentCell.y}
        if(exploreCell(component, tmp, visited, path, queue, grid)) return path;
    }
    return path;
}

const exploreCell = function(component, tmp, visited, path, queue, grid){
    let valid = (cell) => {
        return cell.x>=0 && cell.x<component.props.rows && cell.y>=0 && cell.y<component.props.cols;
    }
    if (valid(tmp) && !visited[tmp.x][tmp.y]) {
        if (grid[tmp.x][tmp.y] === "destination") {
            path.push(tmp);
            return true;
        }
        visited[tmp.x][tmp.y] = true;
        queue.push(tmp);
    }
    return false
}

export default findShortestPathbyBFS;

// const findShortestPath = function(source, grid) {
//     let visited = [];
//     for(let i = 0; i < this.props.size; i++){
//         let row = [];
//         for(let j = 0; j < this.props.size; j++){
//             if(grid[i][j]==="blocked")
//                 row.push(true);
//             else
//                 row.push(false)
//         }
//         visited.push(row);
//     }
//     console.log(visited)
//     let sourceCell = {x:source[0], y:source[1]};
//     let queue = [sourceCell];
//     let path = []
//     while( queue.length > 0 ){
//         let currentCell = queue.shift();
//         path.push(currentCell);
//         visited[currentCell.x][currentCell.y] = true;
//         let tmp = {x: currentCell.x, y: currentCell.y - 1}
//         if(this.exploreCell(tmp, visited, path, queue, grid)) return path;
//         tmp = {x: currentCell.x + 1, y: currentCell.y}
//         if(this.exploreCell(tmp, visited, path, queue, grid)) return path;
//         tmp = {x: currentCell.x, y: currentCell.y + 1}
//         if(this.exploreCell(tmp, visited, path, queue, grid)) return path;
//         tmp = {x: currentCell.x - 1, y: currentCell.y}
//         if(this.exploreCell(tmp, visited, path, queue, grid)) return path;
//     }
//     return path;
// }
//
// let exploreCell = (tmp, visited, path, queue, grid) => {
//     let valid = (cell) => {
//         return cell.x>=0 && cell.x<this.props.size && cell.y>=0 && cell.y<this.props.size;
//     }
//     if (valid(tmp) && !visited[tmp.x][tmp.y]) {
//         if (grid[tmp.x][tmp.y] === "destination") {
//             path.push(tmp);
//             return true;
//         }
//         visited[tmp.x][tmp.y] = true;
//         queue.push(tmp);
//     }
//     return false
// }
//
// export default findShortestPath;