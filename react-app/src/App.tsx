import React from 'react';
import RenderData from './components/RenderData';
import './App.css';

function App() {
  return (
    <div className="App">
      <RenderData
        renderSuccess={<p></p>}
        errorState={<p>Oops, something went wrong</p>}
        loadingState={<p>Loading data...</p>}
      />
    </div>
  );
}

export default App;
