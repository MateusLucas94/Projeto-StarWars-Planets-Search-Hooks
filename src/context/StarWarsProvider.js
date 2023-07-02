import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [name, setName] = useState(0);
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  const initialsFilters = {
    filterByNumericValues: [],
  };

  const inicialOrderFilter = {
    order: {},
  };

  const [sortFilter, setSortFilter] = useState(inicialOrderFilter);

  const [filter, setFilter] = useState(initialsFilters);

  const contextValue = {
    planets,
    setPlanets,
    name,
    setName,
    nameFilter,
    setNameFilter,
    filter,
    setFilter,
    sortFilter,
    setSortFilter,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
