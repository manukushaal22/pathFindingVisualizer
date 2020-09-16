import React from 'react';
import './App.css';
import './parts/Grid'
import Grid from "./parts/Grid";

function App() {
  return (
    <div className="App">
      <Grid rows={25} cols={40}/>
    </div>
  );
}

export default App;
