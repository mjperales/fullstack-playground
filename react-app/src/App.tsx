import React from 'react';
import RenderData from './components/RenderData';
import ParentComponent from './components/MemoizeComponent/ParentComponent';
import './App.css';
import RegistrationForm from './components/ValidateForm/RegistrationForm';
import { AdvanceCustomHooks } from './components/AdvanceCustomHooks/AdvanceCustomHooks';
import { GlobalProvider } from './components/AdvanceCustomHooks/GlobalContext';
import EventDelegation  from './components/EventDelegation/EventDelegation';

function App() {
  return (
    <div className="App">
      <RenderData
        url="http://localhost:3001/api/items"
        renderSuccess={(data) => <p>{JSON.stringify(data, null, 2)}</p>}
        errorState={<p>Oops, something went wrong</p>}
        loadingState={<p>Loading data...</p>}
      />
      <ParentComponent />
      <RegistrationForm />
      <GlobalProvider>
        <AdvanceCustomHooks />
      </GlobalProvider>
      <EventDelegation />
    </div>
  );
}

export default App;
