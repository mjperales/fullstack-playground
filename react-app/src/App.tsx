import './App.css';
import RenderData from './components/RenderData';
import { useState } from 'react';
// import { AdvanceCustomHooks } from './components/AdvanceCustomHooks/AdvanceCustomHooks';
// import { GlobalProvider } from './components/AdvanceCustomHooks/GlobalContext';
import Form from './components/FormTask/Form';

function App() {
  const [textInputValue, setTextInputValue] = useState('');
  const [transformResults, setTransformResults] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTransformResults(
      textInputValue.split('').reverse().join('').toUpperCase()
    );
  };
  const handleReset = () => {
    setTextInputValue('');
    setTransformResults(null);
  };
  return (
    <div className="App">
      <RenderData
        url="http://localhost:3001/api/tasks"
        renderSuccess={(data) => <p>{JSON.stringify(data, null, 2)}</p>}
        errorState={<p>Oops, something went wrong</p>}
        loadingState={<p>Loading data...</p>}
      />
      {/*
      <GlobalProvider>
        <AdvanceCustomHooks />
      </GlobalProvider>
     */}
      <Form />
      <form onSubmit={handleSubmit}>
        <label htmlFor="transform-text">Transform text:</label>
        <textarea
          onChange={(e) => setTextInputValue(e.target.value)}
          value={textInputValue}
          id="transform-text"
        ></textarea>
        <button type="submit">Transform</button>
        <button onClick={handleReset} type="reset">
          Reset
        </button>
      </form>
      {transformResults !== null && <p>{transformResults}</p>}
    </div>
  );
}

export default App;
