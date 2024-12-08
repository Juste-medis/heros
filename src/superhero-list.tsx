import React from 'react';
import { SuperHero } from './SuperHero';
import SuperHeroCard from './Components/superhero-card';

// Le composant SuperHeroCard qui affiche les détails d'un héros
const SuperHeroList: React.FC<SuperHeroListProp> = ({ hero }) => {
    return (
        <a href={`/superheros/${hero.id}`} key={hero.id}
            className='col-md-4 p-6 mb-4 link-offset-2 link-underline link-underline-opacity-0 unity-hero'>
            <div className='unity d-flex flex-column  flex-md-row  align-items-center ' >
                <img className='thunbnail'
                    src={`https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/${hero.images?.md}`} alt="" />

                <div className='d-flex flex-column ps-5' >
                    <SuperHeroCard hero={hero} />
                    <span className='text-dark' >Id API: {hero.id}  </span>
                    <span className='text-dark' >slug: {hero.slug}  </span>
                    <span className='text-dark' >Intelligence: <span className="badge badge-success bg-success text-light">{hero.powerstats.intelligence}</span></span>
                    <span className='text-dark' >Force: <span className="badge badge-danger bg-danger text-light">{hero.powerstats.strength}  </span></span>
                    <span className='text-dark' >Vitesse: <span className="badge badge-warning bg-warning ">{hero.powerstats.speed}  </span></span>
                    <span className='text-dark' >Endurance: <span className="badge badge-info bg-info">{hero.powerstats.durability} </span> </span>
                    <span className='text-dark' >Pouvoir: <span className="badge badge-dark bg-dark text-light">{hero.powerstats.power} </span> </span>
                    <span className='text-dark' >Combat: <span className="badge badge-dark bg-light"> {hero.powerstats.combat}  </span></span>
                </div>
            </div>
        </a>);
};

// Définition du type des props pour SuperHeroCard
type SuperHeroListProp = {
    hero: SuperHero;
};
export default SuperHeroList;