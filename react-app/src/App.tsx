import React from 'react';
import RenderData from './components/RenderData';
import Form from './components/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <RenderData
        url="http://localhost:3001/api/items"
        renderSuccess={(data) => <p>{JSON.stringify(data, null, 2)}</p>}
        errorState={<p>Oops, something went wrong</p>}
        loadingState={<p>Loading data...</p>}
      />

      <Form />

    </div>
  );
}

export default App;
