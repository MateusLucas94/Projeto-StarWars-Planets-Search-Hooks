import React, { useContext } from 'react';
import propTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

export default function ListaDosExcluidos(props) {
  const contextTable = useContext(StarWarsContext);
  const { filter, setFilter } = contextTable;
  const { filterByNumericValues } = filter;
  const { readiciona } = props;

  const readicionaColuna = ({ target }) => {
    readiciona((prevState) => [...prevState, target.name]);
    const novosFiltros = filterByNumericValues
      .filter((filtro) => filtro.column !== target.name);
    setFilter({
      filterByNumericValues: novosFiltros,
    });
  };

  return (
    <div>
      {filterByNumericValues.map(({ column, comparison, value }) => (
        <div
          data-testid="filter"
          key={ column }
        >
          <span>{`${column} ${comparison} ${value}`}</span>
          <button
            name={ column }
            type="button"
            onClick={ readicionaColuna }
          >
            x

          </button>
        </div>
      ))}
    </div>
  );
}

ListaDosExcluidos.propTypes = {
  readiciona: propTypes.func.isRequired,
};
