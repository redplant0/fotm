import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import type { CalendarCrop, CalendarDay, Crop, Season } from "../types/app-types";
import AddCropForm from "../components/AddCropForm";
import { deleteCropById, getAllCropsBySeason } from "../lib/db";
import { convertDBCrop, createCalendarCropFromRegrowing } from "../lib/utils";

function CalendarPage() {
  // calendar obj
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [season, setSeason] = useState<Season | undefined>();

  // TODO: Create a better and less confusing way to delete a crop
  const [selectedCrop, setSelectedCrop] = useState(0)

  // Populate initial calendar on load
  useEffect(() => {
    setEmptyCalendar();

    // set the current season from local storage

    setSeason(localStorage.getItem('currentSeason') as Season || undefined)
  }, []);

  // Refresh the calendar if season's changed
  useEffect(() => {
    (async () => {
      await refreshCalendar();
    })();
  }, [season]);

  // A handy function to empty the calendar
  const setEmptyCalendar = useCallback(() => {
    const days: CalendarDay[] = Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      crops: [],
    }));
    setDays(days);
  }, []);

  // A handy function to refresh the calendar
  // TODO: A more efficient way to create the calendar
  const refreshCalendar = useCallback(async () => {
    if (!season) {
      setEmptyCalendar();
      return;
    }
    console.log("Refreshing calendar");

    const newDays: CalendarDay[] = Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      crops: [],
    }));
    const dbCrops = await getAllCropsBySeason(season);

    if (dbCrops) {
      // split these crops
      const singleHarvestCrops: Crop[] = [];
      const regrowingCrops: Crop[] = [];

      dbCrops.forEach((crop) => {
        if (crop.regrowthTime){
          regrowingCrops.push(crop)
        } else {
          singleHarvestCrops.push(crop)
        }
      })

      const crops: CalendarCrop[] = []

      singleHarvestCrops.forEach((crop) => crops.push(convertDBCrop(crop)))
      regrowingCrops.forEach((crop) => crops.push(...createCalendarCropFromRegrowing(crop)))


      crops.forEach((crop) => {
        newDays.forEach((day) => {
          if (day.day === crop.plantedDate || day.day == crop.harvestDate) {
            day.crops?.push(crop);
          }
        });
      });

      setDays(newDays);
      localStorage.setItem('currentSeason', season)
    }
  }, [season]);

  return (
    <>
      <div className="w-full mt-5 px-4 gap-4 flex flex-col mb-4">
        {/* Season select */}
        <div>
          <select
            id="season"
            className="py-2"
            onChange={(e) => setSeason(e.target.value as Season | undefined)}
            value={season}
          >
            <option value="">Select Season</option>
            {["Spring", "Summer", "Fall"].map((season, i) => (
              <option value={season} key={i}>
                {season}
              </option>
            ))}
          </select>
        </div>

        {/* Calendar */}
        <div className="flex flex-wrap">
          {days &&
            days.map((day, i) => {
              const isFifth = (i + 1) % 5 === 0;
              const isLastRow = day.day >= 26;
              return (
                <div
                  className={clsx(
                    "border-t border-l w-1/5 aspect-square text-xs flex flex-col gap-2 overflow-y-hidden",
                    isFifth && "border-r",
                    isLastRow && "border-b"
                  )}
                  key={i}
                >
                  <span className="pt-1 pl-1">{day.day}</span>
                  {/* crop */}
                  <div className="w-full flex flex-col overflow-y-scroll gap-1">
                    {day.crops &&
                      day.crops.map((crop, i) => (
                        <button onClick={() => {
                          if (selectedCrop === crop.id){
                            setSelectedCrop(0)
                          } else setSelectedCrop(crop.id!)}}
                          className={clsx(
                            " p-1 ",
                            crop.plantedDate === day.day && "bg-green-100",
                            crop.harvestDate === day.day && "bg-amber-100",
                            selectedCrop === crop.id && '!bg-red-300'
                          )}
                          key={i}
                        >
                          {crop.name}
                        </button>
                      ))}
                  </div>
                </div>
              );
            })}
        </div>

        {/*  Add crop button */}
        <button
          onClick={() => setShowForm(true)}
          className="px-2 py-4 bg-green-600 text-white disabled:bg-gray-400"
          disabled={!season}
        >
          Plant Crop
        </button>

                {/*  Delete crop button */}
        <button
          onClick={() => deleteCropById(selectedCrop).then(()=> {refreshCalendar(); setSelectedCrop(0)})}
          className="px-2 py-4 bg-red-600 text-white disabled:bg-gray-400"
          disabled={!selectedCrop}
        >
          Delete Crop
        </button>
      </div>

      <div className={showForm && season ? "block" : "hidden"}>
        <AddCropForm
          season={season as Season}
          hideForm={() => setShowForm(false)}
          refreshCalendar={refreshCalendar}
        />
      </div>
    </>
  );
}

export default CalendarPage;
