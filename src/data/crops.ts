import type { ReferenceCrop, Season } from "../types/app-types";



const crops: ReferenceCrop[] = [
  {
    name: "Turnip",
    harvest_time: 4,
    regrowth_time: null,
    season: "Spring",
    seed_cost: 120,
    sell_price: 60,
  },
  {
    name: "Potato",
    harvest_time: 7,
    regrowth_time: null,
    season: "Spring",
    seed_cost: 150,
    sell_price: 80,
  },
  {
    name: "Cucumber",
    harvest_time: 9,
    regrowth_time: 5,
    season: "Spring",
    seed_cost: 200,
    sell_price: 60,
  },
  {
    name: "Cabbage",
    harvest_time: 14,
    regrowth_time: null,
    season: "Spring",
    seed_cost: 500,
    sell_price: 250,
  },
  {
    name: "Strawberry",
    harvest_time: 8,
    regrowth_time: 2,
    season: "Spring",
    seed_cost: 150,
    sell_price: 30,
  },

  {
    name: "Onion",
    harvest_time: 8,
    regrowth_time: null,
    season: "Summer",
    seed_cost: 150,
    sell_price: 80,
  },
  {
    name: "Tomato",
    harvest_time: 9,
    regrowth_time: 3,
    season: "Summer",
    seed_cost: 200,
    sell_price: 60,
  },
  {
    name: "Corn",
    harvest_time: 14,
    regrowth_time: 4,
    season: "Summer",
    seed_cost: 300,
    sell_price: 100,
  },
  {
    name: "Pineapple",
    harvest_time: 20,
    regrowth_time: 6,
    season: "Summer",
    seed_cost: 1000,
    sell_price: 500,
  },
  {
    name: "Pumpkin",
    harvest_time: 14,
    regrowth_time: null,
    season: "Summer",
    seed_cost: 500,
    sell_price: 250,
  },

  {
    name: "Carrot",
    harvest_time: 8,
    regrowth_time: null,
    season: "Fall",
    seed_cost: 300,
    sell_price: 120,
  },
  {
    name: "Eggplant",
    harvest_time: 9,
    regrowth_time: 3,
    season: "Fall",
    seed_cost: 120,
    sell_price: 80,
  },
  {
    name: "Sweet Potato",
    harvest_time: 6,
    regrowth_time: 3,
    season: "Fall",
    seed_cost: 300,
    sell_price: 120,
  },
  {
    name: "Green Pepper",
    harvest_time: 8,
    regrowth_time: 2,
    season: "Fall",
    seed_cost: 150,
    sell_price: 40,
  },
  {
    name: "Spinach",
    harvest_time: 6,
    regrowth_time: null,
    season: "Fall",
    seed_cost: 200,
    sell_price: 80,
  },
];

export const getAllCropsNames = (season?: Season) => {
  let filteredCrops = crops;

  if (season) {
    filteredCrops = crops.filter((crop) => crop.season === season);
  }

  return filteredCrops.map(({ name }) => name);
};

export const getCropByName = (name: string) => {
  const crop = crops.find((c) => c.name === name)!;
  return crop;
};

export default crops