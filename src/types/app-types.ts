

export type CalendarCrop = {
    id?: number,
    plantedDate: number, // single number
    harvestDate: number, // single number
    name: string
}

export type Crop = {
    id?: number,
    harvestDate: number,
    plantedDate: number,
    name: string,
    regrowthTime: number | null,
    season: string
}

export type ReferenceCrop = {
    name: string,
    harvest_time: number,
    regrowth_time: number | null,
    season: Season,
    seed_cost: number,
    sell_price: number 
}

export type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter'


export type Character = {
    name: string,
    birthday: [season: Season, day: number] | null
    likes: string[],
    dislikes: string[],
    schedule: string[],
}