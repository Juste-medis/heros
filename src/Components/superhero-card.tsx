import React from 'react';
import { SuperHero } from '../SuperHero';

// Le composant SuperHeroCard qui affiche les détails d'un héros
const SuperHeroCard: React.FC<SuperHeroCardProps> = ({ hero }) => {
    return (
        <span className='fw-bold fs-4 text-dark' >{hero.name}  </span>
    );
};

// Définition du type des props pour SuperHeroCard
type SuperHeroCardProps = {
    hero: SuperHero;
};
export default SuperHeroCard;