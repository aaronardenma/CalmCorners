import React from 'react';
import Map from './components/Map';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Calm Corners</h1>
      <h2>Locate study spaces that suit your needs!</h2>
      <Map />
    </div>
  );
}

export default App;
