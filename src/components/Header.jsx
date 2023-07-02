import React, { useEffect, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TabelaDoHeader from './TabelaDoHeader';
import TabelaDosPlanetas from './TabelaDosPlanetas';

function Header() {
  const { setPlanets, setNameFilter } = useContext(StarWarsContext);

  const getPlanets = async () => {
    try {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const data = await response.json();
      setPlanets(data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const { value } = event.target;
    setNameFilter(value);
  };

  useEffect(() => {
    getPlanets();
  }, []);
  return (
    <header>
      <h1>Projeto Star Wars - Trybe</h1>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleChange }
      />
      <table>
        <TabelaDoHeader />
        <TabelaDosPlanetas />
      </table>
    </header>
  );
}

// Header.contextType = StarWarsContext;

export default Header;
