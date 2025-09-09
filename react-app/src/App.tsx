import './App.css';
import RenderData from './components/RenderData';
// import { AdvanceCustomHooks } from './components/AdvanceCustomHooks/AdvanceCustomHooks';
// import { GlobalProvider } from './components/AdvanceCustomHooks/GlobalContext';
import Form from './components/FormTask/Form';

function App() {
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
    </div>
  );
}

export default App;
