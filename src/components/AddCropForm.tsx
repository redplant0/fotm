import { useEffect, useState } from "react";
import { getAllCropsNames } from "../data/crops";
import { saveCrop } from "../lib/db";
import type { Season } from "../types/app-types";

export default function AddCropFormModal({
  season,
  hideForm,
  refreshCalendar: onFinish,
  currentDay,
  showModal
}: {
  season: Season;
  currentDay?: number,
  hideForm: () => void,
  showModal: boolean,
  refreshCalendar: () => Promise<void>,
}) {
  const [crops, setCrops] = useState<string[]>([]);

  const [selectedCrop, setSelectedCrop] = useState("");
  const [plantedDay, setPlantedDay] = useState(1);

  useEffect(() => {
    setCrops(getAllCropsNames(season));
  }, [season]);


  // Avoids necessary re computing of season by splitting it to this
  useEffect(() => {
    if (currentDay){
      setPlantedDay(currentDay)
    }
  }, [currentDay])

  // Only show null but keep this components computation
  if (!showModal){
    return null
  }

  const plantCrop = async () => {

    if (!selectedCrop){
        return
    }

    await saveCrop({name: selectedCrop, plantedDate: plantedDay})
    console.log('Saved')
    await onFinish()

    setSelectedCrop("")
    setPlantedDay(1)
    hideForm()
  }

  return (
    <div className="w-screen fixed top-0 left-0 flex justify-center">
      <div className="absolute w-screen h-screen top-0 left-0 bg-black opacity-50" onClick={hideForm}></div>

      <div className="z-10 w-4/5 bg-white flex flex-col p-4 gap-4 mt-[20vh]">
        {/* List of crops */}
        <h3>Planting in {season}</h3>

        {/* Crop input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="crops" className="text-xs">
            {season} crops
          </label>
          <select
            className="px-4 py-2"
            id="crops"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            <option value="">Select a crop</option>
            {crops.map((crop, i) => (
              <option key={i} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>

        {/* Day */}
        <div className="flex flex-col gap-2">
          <label htmlFor="plantedDay" className="text-xs">
            Day (1-30)
          </label>
          <select
            className="px-4 py-2"
            id="plantedDay"
            value={plantedDay}
            onChange={(e) => setPlantedDay(Number(e.target.value))}
          >
            {[...Array(30)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Plant */}
        <button className="px-4 py-2 text-white bg-green-700 disabled:bg-gray-400" onClick={plantCrop} disabled={!selectedCrop}>Plant Crop</button>
      </div>
    </div>
  );
}
