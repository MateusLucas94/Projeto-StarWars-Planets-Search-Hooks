import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function TabelaDosPlanetas() {
  const contextTable = useContext(StarWarsContext);
  const { planets, nameFilter, filter, sortFilter } = contextTable;
  const [planetasFiltrados, setPlanetasFiltrados] = useState([]);
  const [planetsData, setPlanetsData] = useState({
    unknownData: [],
    planets: [],
  });

  useEffect(() => {
    const um = 1;
    setPlanetasFiltrados(planets);
    planets.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -um;
      }
      return 0;
    });
  }, [planets]);

  const filtrarPorNome = () => {
    const Filtrados = planets
      .filter((umPlaneta) => umPlaneta.name.toLowerCase()
        .includes(nameFilter.toLowerCase()));
    return Filtrados;
  };

  useEffect(() => {
    setPlanetasFiltrados(filtrarPorNome());
  }, [nameFilter]);

  useEffect(() => {
    let sortedList = [];
    const { unknownData, data } = planetsData;
    const { order } = sortFilter;
    if (order.sort === 'ASC') {
      sortedList = data
        .sort((a, b) => Number(a[order.column]) - Number(b[order.column]));
      return setPlanetasFiltrados([...sortedList, ...unknownData]);
    }
    if (order.sort === 'DESC') {
      sortedList = data
        .sort((a, b) => Number(b[order.column]) - Number(a[order.column]));
      return setPlanetasFiltrados([...sortedList, ...unknownData]);
    }
  }, [sortFilter.order, planetsData]);

  useEffect(() => {
    const { filterByNumericValues } = filter;
    const filtradosPorNome = filtrarPorNome();
    const ccvFilter = filterByNumericValues
      .reduce((filteredPlanets, { column, comparison, value }) => {
        if (comparison === 'maior que') {
          return filteredPlanets
            .filter((planeta) => Number(planeta[column]) > Number(value));
        }

        if (comparison === 'menor que') {
          return filteredPlanets
            .filter((planeta) => Number(planeta[column]) < Number(value));
        }
        console.log(value, filteredPlanets);
        return filteredPlanets
          .filter((planeta) => Number(planeta[column]) === Number(value));
      }, filtradosPorNome);
    setPlanetasFiltrados(ccvFilter);
  }, [filter]);

  useEffect(() => {
    const { order } = sortFilter;
    const unknownData = planets
      .filter((planet) => planet[order.column] === 'unknown');
    const data = planets.filter((planet) => planet[order.column] !== 'unknown');
    setPlanetsData({
      unknownData,
      data,
    });
  }, [sortFilter, planets]);

  return (
    <div>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { planetasFiltrados.map((planeta) => (
          <tr key={ planeta.name }>
            <td data-testid="planet-name">{planeta.name}</td>
            <td>{planeta.rotation_period}</td>
            <td>{planeta.orbital_period}</td>
            <td>{planeta.diameter}</td>
            <td>{planeta.climate}</td>
            <td>{planeta.gravity}</td>
            <td>{planeta.terrain}</td>
            <td>{planeta.surface_water}</td>
            <td>{planeta.population}</td>
            <td>{planeta.films}</td>
            <td>{planeta.created}</td>
            <td>{planeta.edited}</td>
            <td>{planeta.url}</td>
          </tr>
        )) }
      </tbody>
    </div>
  );
}

// TabelaDoHeader.contextType = StarWarsContext;

export default TabelaDosPlanetas;
