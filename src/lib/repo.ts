import characterData from '../data/characters'
import type { Season } from '../types/app-types';

import cropsData from '../data/crops'


export function getAllCharacters(season?: Season){

    let characters = characterData;

    if (season)
        characters = characters.filter((character) => character.birthday?.[0] === season)

    return characters;
}

export const getAllCrops = (season?: Season) => {
  let filteredCrops = cropsData;

  if (season) {
    filteredCrops = cropsData.filter((crop) => crop.season === season);
  }

  return filteredCrops
};