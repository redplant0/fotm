import { getCropByName } from "../data/crops";
import type { CalendarCrop, Crop } from "../types/app-types";


export const createDBCrop = (crop: {name: string, plantedDate: number}) => {
  const refCrop = getCropByName(crop.name);

  const dbCrop: Crop = {
    name: crop.name,
    harvestDate: calculateHarvestDate(crop.plantedDate, refCrop.harvest_time),
    plantedDate: crop.plantedDate,
    season: refCrop.season,
    regrowthTime: refCrop.regrowth_time
  };
  return dbCrop;
};

export const calculateHarvestDate = (
  plantedDate: number,
  harvestTime: number
) => {
  const computedValue = plantedDate + harvestTime; // planted date is not counted as 1 day
  if (computedValue <= 30){
    return computedValue
  }
  return -1
};


export const convertDBCrop = (crop: Crop) => {
    const calendarCrop: CalendarCrop = {
        plantedDate: crop.plantedDate,
        harvestDate: crop.harvestDate,
        name: crop.name,
        id: crop.id
    }
    return calendarCrop
}


export const createCalendarCropFromRegrowing = (crop: Crop) => {
    let nextHarvestDate = crop.harvestDate;
    const crops: CalendarCrop[] = []
    while (true){

      let plantedDate;

      // For the first growth
      if (nextHarvestDate === crop.harvestDate) plantedDate = crop.plantedDate
      else plantedDate = 0

      crops.push({
        plantedDate: plantedDate,
        harvestDate: nextHarvestDate,
        name: crop.name,
        id: crop.id
      })

       // Ensure that only regrowing crops will be passed to this function.
       // Also the growth time happens the next day, so no need to delete
      nextHarvestDate = nextHarvestDate + crop.regrowthTime!
      if (nextHarvestDate > 30) break
    }
    return crops
}