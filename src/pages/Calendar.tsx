import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import type { CalendarCrop, Crop, Season } from "../types/app-types";
import AddCropFormModal from "../components/AddCropForm";
import { deleteCropById, getAllCropsBySeason } from "../lib/db";
import { convertDBCrop, createCalendarCropFromRegrowing } from "../lib/utils";

function CalendarPage() {
  // calendar obj
  const [showModal, setShowForm] = useState(false);
  const [season, setSeason] = useState<Season | undefined>();

  // Update: Use Map for Calendar days for efficiency
  // Future: I wonder if this can be combined with birthday events for a singular calendar
  const [calendarDays, setCalendarDays] = useState<Map<number, CalendarCrop[]>>(
    new Map<number, CalendarCrop[]>()
  );

  // Feat: Highlight day
  const [currentDay, setCurrentDay] = useState(0);

  // TODO: Create a better and less confusing way to delete a crop
  const [selectedCrop, setSelectedCrop] = useState(0);

  // Populate initial calendar on load
  useEffect(() => {
    setEmptyCalendar();

    // Feat: Hightlight day
    setCurrentDay(Number(localStorage.getItem("currentDay") || 0));

    // set the current season from local storage

    setSeason((localStorage.getItem("currentSeason") as Season) || undefined);
  }, []);

  // Feat: Highlight day
  useEffect(() => {
    if (currentDay) {
      localStorage.setItem("currentDay", currentDay.toString());
    }
  }, [currentDay]);

  // Refresh the calendar if season's changed
  useEffect(() => {
    (async () => {
      await refreshCalendar();
    })();
  }, [season]);

  // A handy function to empty the calendar
  const setEmptyCalendar = useCallback(() => {
    const newDays = Array.from(
      { length: 30 },
      (_, i) => [i + 1, []] as [number, CalendarCrop[]]
    );
    setCalendarDays(new Map(newDays));
  }, []);

  // A handy function to refresh the calendar
  // TODO: A more efficient way to create the calendar
  const refreshCalendar = useCallback(async () => {
    if (!season) {
      setEmptyCalendar();
      return;
    }
    console.log("Refreshing calendar");

    const newDays = new Map(
      Array.from(
        { length: 30 },
        (_, i) => [i + 1, []] as [number, CalendarCrop[]]
      )
    );
    const dbCrops = await getAllCropsBySeason(season);

    if (dbCrops) {
      // split these crops
      const singleHarvestCrops: Crop[] = [];
      const regrowingCrops: Crop[] = [];

      dbCrops.forEach((crop) => {
        if (crop.regrowthTime) {
          regrowingCrops.push(crop);
        } else {
          singleHarvestCrops.push(crop);
        }
      });

      const crops: CalendarCrop[] = [];

      singleHarvestCrops.forEach((crop) => crops.push(convertDBCrop(crop)));
      regrowingCrops.forEach((crop) =>
        crops.push(...createCalendarCropFromRegrowing(crop))
      );

      crops.forEach((crop) => {
        // WARN: Ensure the harvest date are properly formatted. For example, 1-30
        newDays.get(crop.harvestDate)?.push(crop);
        newDays.get(crop.plantedDate)?.push(crop);
      });

      setCalendarDays(newDays);
      localStorage.setItem("currentSeason", season);
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
          {calendarDays &&
            [...calendarDays.entries()].map(([day, crops], i) => {
              const isFifth = (i + 1) % 5 === 0;
              const isLastRow = day >= 26;
              return (
                <div
                  className={clsx(
                    "border-t border-l w-1/5 aspect-square text-xs flex flex-col gap-2 overflow-y-hidden",
                    isFifth && "border-r",
                    isLastRow && "border-b"
                  )}
                  key={i}
                >
                  <span
                    onClick={() => setCurrentDay(day)}
                    className={clsx(
                      "relative flex items-center justify-center w-6 h-6 select-none",
                      day === currentDay &&
                        "text-white before:content-[''] before:absolute before:w-6 before:h-6 before:bg-red-500 before:rounded-full before:-z-10"
                    )}
                  >
                    {day}
                  </span>
                  {/* crop */}
                  <div className="w-full flex flex-col overflow-y-scroll gap-1">
                    {crops &&
                      crops.map((crop, i) => (
                        <button
                          onClick={() => {
                            if (selectedCrop === crop.id) {
                              setSelectedCrop(0);
                            } else setSelectedCrop(crop.id!);
                          }}
                          className={clsx(
                            " p-1 ",
                            crop.plantedDate === day && "bg-green-100",
                            crop.harvestDate === day && "bg-amber-100",
                            selectedCrop === crop.id && "!bg-red-300"
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
          onClick={() =>
            deleteCropById(selectedCrop).then(() => {
              refreshCalendar();
              setSelectedCrop(0);
            })
          }
          className="px-2 py-4 bg-red-600 text-white disabled:bg-gray-400"
          disabled={!selectedCrop}
        >
          Delete Crop
        </button>
      </div>


      {/* TODO: Return this component to only showing null and refreshing current day because it contains expensive calculation, apparently */}
        <AddCropFormModal
          season={season as Season}
          hideForm={() => setShowForm(false)}
          refreshCalendar={refreshCalendar}
          currentDay={currentDay}
          showModal={showModal && !!season}
        />
    </>
  );
}

export default CalendarPage;
