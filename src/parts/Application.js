import React from 'react';
import Grid from "./Grid";
import Slider from "@material-ui/core/Slider";

class Application extends React.Component {
    constructor() {
        super();
        this.state = {
            gridSize:10
        };
    }

    valuetext = (value) => {
        return `${value}`;
    }

    changeSize = (e,number) => {
        this.setState({gridSize: number})
    }

    render() {
        return (
            <div style={{marginTop:"5vw"}}>
                <Slider
                    defaultValue={this.state.gridSize}
                    getAriaValueText={() => this.valuetext()}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={2}
                    marks={true}
                    min={2}
                    max={25}
                    onChange={this.changeSize}
                    style={{width:"50vh"}}
                />
                <Grid key={this.state.gridSize} size={this.state.gridSize}/>
            </div>
            );
    }
}

export default Application;