import React, { FunctionComponent } from 'react';
import SuperHerosData from '../SuperHeros.json';

import { RouteComponentProps, Link, useHistory } from 'react-router-dom';
import SuperHeroCard from '../Components/superhero-card';
type Params = {
    id: string;
};
const DetailPage: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    const { id } = match.params;
    const [hero, setHero] = React.useState<any>();

    const history = useHistory();
    const handleButtonClick = () => {
        history.push('/');
    };

    React.useEffect(() => {
        const heroesFromData: any = SuperHerosData.find((heroData: any) => {
            return heroData['id'] === Number(id)
        }
        );
        if (!heroesFromData) {
            history.push('/error'); // Ou '/home' pour aller à la page d'accueil
        } else {
            setHero(heroesFromData);
        }
    }, [id, history]);
    
    return hero?.images ? (
        <div>
            <button className='border-0 p-2' onClick={handleButtonClick}>
                retour
            </button>

            <div className=' mt-4 flex-column flex-md-row d-flex align-items-start row ' >
                <div className='col col-12 col-md-4'>
                    <img className='detail-thunbnail'
                        src={`https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images/${hero.images?.lg}`} alt="" />
                </div>

                <div className='col col-12 col-md-8'>
                    <div className='d-flex flex-column ps-0  ps-md-5 detail-list' >
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

            </div>
            <hr className="mt-4" />
            <Link className='mb-4 text-dark' to="/">Retour à la page d'accueil</Link>

            <div className='otherdetait container pt-5 mb-5' >

                <div className='  flex-column flex-md-row d-flex align-items-start row ' >
                    <div className='col col-12 col-md-3'>
                        <h3>Biographie</h3>
                        <p><strong>Nom complet :</strong> {hero.biography.fullName || 'N/A'}</p>
                        <p><strong>Alias :</strong> {hero.biography.aliases.join(', ') || 'N/A'}</p>
                        <p><strong>Lieu de naissance :</strong> {hero.biography.placeOfBirth || 'N/A'}</p>
                        <p><strong>Première apparition :</strong> {hero.biography.firstAppearance || 'N/A'}</p>
                        <p><strong>Éditeur :</strong> {hero.biography.publisher || 'N/A'}</p>
                    </div>
                    <div className='col col-12 col-md-3'>
                        <h3>Apparence</h3>
                        <p><strong>Genre :</strong> {hero.appearance.gender || 'N/A'}</p>
                        <p><strong>Race :</strong> {hero.appearance.race || 'N/A'}</p>
                        <p><strong>Taille :</strong> {hero.appearance.height.join(', ') || 'N/A'}</p>
                        <p><strong>Poids :</strong> {hero.appearance.weight.join(', ') || 'N/A'}</p>
                    </div>
                    <div className='col col-12 col-md-3'>
                        <h3>Travail</h3>
                        <p><strong>Occupation :</strong> {hero.work.occupation || 'N/A'}</p>
                        <p><strong>Base d'opérations :</strong> {hero.work.base || 'N/A'}</p>

                    </div>
                    <div className='col col-12 col-md-3'>
                        <h3>Connexions</h3>
                        <p><strong>Affiliations :</strong> {hero.connections.groupAffiliation || 'N/A'}</p>
                        <p><strong>Famille :</strong> {hero.connections.relatives || 'N/A'}</p>

                    </div>
                </div>

            </div>
        </div>
    ) : <span>Chargement</span>;
};

export default DetailPage;