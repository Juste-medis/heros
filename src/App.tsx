// App.tsx
import React, { useState, useEffect, FunctionComponent } from 'react';
import SuperHerosData from './SuperHeros.json'; // Remplace ce fichier avec tes données de super-héros
import './App.css';
import SuperHeroList from './superhero-list';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import DetailPage from './page/superhero-detail.tsx';
import ErrorPage from './page/error';

interface Powerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

interface SuperHero {
  id: number;
  name: string;
  slug: string;
  powerstats: Powerstats;
  // autres propriétés peuvent être ajoutées ici...
}

const MyApp: FunctionComponent = () => {
  const [heroes, setHeroes] = useState<SuperHero[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [powerFilters, setPowerFilters] = useState<{ power: string, minLevel: number }[]>([]);

  useEffect(() => {
    // Map pour charger les données depuis SuperHeros.json et les transformer en objets SuperHero
    const heroesFromData = SuperHerosData.map((heroData: any) => ({
      id: heroData.id,
      name: heroData.name,
      slug: heroData.slug,
      powerstats: heroData.powerstats,
      ...heroData
    }));
    setHeroes(heroesFromData);
  }, []);

  // Fonction de filtrage par nom et par pouvoir
  const filterHeroes = (heroes: SuperHero[]) => {
    return heroes.filter((hero) => {
      // Filtrage par nom
      const matchesName = hero.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtrage par pouvoir
      const matchesPowers = powerFilters.every((filter) => {
        const heroPowerLevel = hero.powerstats[filter.power as keyof Powerstats];
        return heroPowerLevel >= filter.minLevel; // Vérifier si le niveau du pouvoir est suffisant
      });

      return matchesName && matchesPowers;
    });
  };

  const handleAddPowerFilter = () => {
    setPowerFilters([...powerFilters, { power: "strength", minLevel: 0 }]); // Ajoute un filtre par défaut pour "strength"
  };

  const handlePowerFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const updatedFilters = [...powerFilters];
    updatedFilters[index].power = e.target.value;
    setPowerFilters(updatedFilters);
  };

  const handleLevelFilterChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedFilters = [...powerFilters];
    updatedFilters[index].minLevel = parseInt(e.target.value);
    setPowerFilters(updatedFilters);
  };

  const filteredHeroes = filterHeroes(heroes);

  return (
    <div className="container p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-2"
        />
      </div>

      {/* Formulaire de filtrage par pouvoirs */}
      <div className="mb-4">
        <h5>Filtrer par pouvoir</h5>
        {powerFilters.map((filter, index) => (
          <div key={index} className="mb-3">
            <select
              value={filter.power}
              onChange={(e) => handlePowerFilterChange(e, index)}
              className="form-control mb-2"
            >
              <option value="strength">Force</option>
              <option value="intelligence">Intelligence</option>
              <option value="speed">Vitesse</option>
              <option value="durability">Durabilité</option>
              <option value="power">Pouvoir</option>
              <option value="combat">Combat</option>
            </select>
          
            <input
              type="number"
              value={filter.minLevel}
              onChange={(e) => handleLevelFilterChange(e, index)}
              placeholder="Niveau minimum"
              className="form-control"
            />

            
          </div>
        ))}
        <button className="btn btn-secondary" onClick={handleAddPowerFilter}>
          Ajouter un filtre de pouvoir
        </button>
      </div>

      <div className="row m-auto">
        {filteredHeroes.map((hero: any) => (
          <SuperHeroList key={hero.id} hero={hero} />
        ))}
      </div>
    </div>
  );
};

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Accueil</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/superheros/20">Détails du hero 20</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/superheros/20">A propos</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="container body-container">
        <Switch>
          <Route exact path="/superheros/:id" component={DetailPage} />
          <Route exact path="/" component={MyApp} />
          <Route path="/error" component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
