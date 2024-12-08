 
export class SuperHero {
    id: number;
    name: string;
    idApi: number;
    images: any;
    slug: string | undefined;
    powerstats: PowerStats;

    constructor(
        id: number,
        name: string,
        idApi: number,
        slug?: string, powerstats: PowerStats = {
            intelligence: 0,
            strength: 0,
            speed: 0,
            durability: 0,  
            power: 0,
            combat: 0
        },
    ) {
        this.id = id;
        this.name = name;
        this.idApi = idApi;
        this.slug = slug;
        this.powerstats = powerstats;
    }
}

export interface PowerStats {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
}
