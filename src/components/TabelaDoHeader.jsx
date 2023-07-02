import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import ListaDosExcluidos from './ListaDosExcluidos';

function TabelaDoHeader() {
  const contextTable = useContext(StarWarsContext);
  const { setFilter, setSortFilter } = contextTable;
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [numericValue, setNumericValue] = useState(0);
  const colunasPadrao = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [colunasDaTabela, setColunasDaTabela] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const [colunasFiltradas, setColunasFiltradas] = useState([]);
  const [radioSelected, setRadioSelected] = useState('ASC');
  const [sortColumn, setSortColumn] = useState('population');

  const operadores = ['maior que', 'menor que', 'igual a'];

  const handleChangeColumn = (event) => {
    const { value } = event.target;
    setColumn(value);
  };

  const handleChangeComparison = (event) => {
    const { value } = event.target;
    setComparison(value);
  };

  const handleChangeValue = (event) => {
    const { value } = event.target;
    setNumericValue(value);
  };

  const removeColuna = () => {
    const novasColunas = colunasDaTabela.filter((coluna) => coluna !== column);
    setColumn(novasColunas[0]);
    setColunasDaTabela(novasColunas);
  };

  const adicionaColuna = () => {
    setColunasFiltradas((prevState) => [...prevState, column]);
  };

  const handleFilter = () => {
    const newFilters = {
      column,
      comparison,
      value: numericValue,
    };
    setFilter((prevState) => ({
      filterByNumericValues: [
        ...prevState.filterByNumericValues, newFilters,
      ],
    }));
    removeColuna();
    adicionaColuna();
  };

  const removerFiltros = () => {
    setFilter({
      filterByNumericValues: [],
    });
    setColunasDaTabela((prevState) => [
      ...prevState,
      colunasFiltradas,
    ]);
  };

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setRadioSelected(value);
  };

  const handleSortColumn = (event) => {
    const { value } = event.target;
    setSortColumn(value);
  };

  const handleSortButton = () => {
    const object = { column: sortColumn, sort: radioSelected };
    setSortFilter({
      order: object,
    });
  };

  return (
    <div>
      <div>
        <label htmlFor="colunasDaTabela">
          Coluna
          <select
            id="colunasDaTabela"
            name="colunasDaTabela"
            data-testid="column-filter"
            value={ column }
            onChange={ handleChangeColumn }
          >
            { colunasDaTabela.map((coluna, index) => (
              <option key={ index }>{coluna}</option>
            ))}
          </select>
        </label>

        <label htmlFor="operadores">
          Operador
          <select
            id="operadores"
            name="operadores"
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ handleChangeComparison }
          >
            { operadores.map((operador, index) => (
              <option key={ index }>{operador}</option>
            ))}
          </select>
        </label>

        <input
          type="number"
          data-testid="value-filter"
          value={ numericValue }
          onChange={ handleChangeValue }
        />

        <button
          onClick={ handleFilter }
          type="button"
          data-testid="button-filter"
        >
          Filtrar

        </button>
        <label htmlFor="colunaDeOrdem">
          Ordenar
          <select
            id="colunaDeOrdem"
            name="colunaDeOrdem"
            data-testid="column-sort"
            value={ sortColumn }
            onChange={ handleSortColumn }
          >
            { colunasPadrao.map((coluna, index) => (
              <option key={ index }>{coluna}</option>
            ))}
          </select>
        </label>
        <label htmlFor="ascendente">
          Ascendente
          <input
            checked={ radioSelected === 'ASC' }
            onChange={ handleRadioChange }
            value="ASC"
            type="radio"
            id="ascendete"
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="descendente">
          Descendente
          <input
            checked={ radioSelected === 'DESC' }
            onChange={ handleRadioChange }
            value="DESC"
            type="radio"
            id="descendente"
            data-testid="column-sort-input-desc"
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSortButton }
        >
          Ordenar

        </button>

        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removerFiltros }
        >
          Remover Filtros

        </button>
      </div>
      <ListaDosExcluidos
        readiciona={ setColunasDaTabela }
      />
    </div>
  );
}

export default TabelaDoHeader;
