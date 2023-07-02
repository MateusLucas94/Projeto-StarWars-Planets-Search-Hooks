import React from 'react';
import './App.css';
import Header from './components/Header';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <Header />
    </StarWarsProvider>
  );
}

export default App;
