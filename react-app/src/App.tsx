import React from 'react';
import RenderData from './components/RenderData';
import Form from './components/Form';
import { DataFilter } from './components/DataFilter';
import { useData } from './hooks/useData';
import { WeatherForm } from './components/WeatherForm/WeatherForm';
import AutoComplete from './components/AutoComplete/AutoComplete';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <RenderData
        url="https://jsonplaceholder.typicode.com/posts"
        renderSuccess={(data: { data: { userId: number; id: number; title: number; }[]}) => <DataFilter data={data} />}
        errorState={<p>Oops, something went wrong</p>}
        loadingState={<p>Loading data...</p>}
      /> */}
      {/* <WeatherForm /> */}
      <AutoComplete />
    </div>
  );
}

export default App;
