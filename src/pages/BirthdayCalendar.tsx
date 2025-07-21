import clsx from "clsx";
import { useEffect, useState } from "react";
import { getAllCharacters } from "../lib/repo";
import type { Character, Season } from "../types/app-types";
import BirthdayModal from "../components/BirthdaysModal";

export default function BirthdayCalendarPage() {
  const [days, setDays] = useState<Map<number, Character[]>>(new Map());
  const [season, setSeason] = useState<Season | undefined>()
  const [shown, setIsShown] = useState(false);

  const [activeDay, setActiveDay] = useState(0);

  //   Initial run

  useEffect(()=> {
    if (!season){
      setSeason(localStorage.getItem('birthdaySeason') as Season)
    }
  }, [])


  useEffect(() => {

    const arr = Array.from(
      { length: 30 },
      (_, i) => [i + 1, []] as [number, Character[]]
    );

    const newDays = new Map(arr);

    const characters = getAllCharacters(season);

    characters.forEach((character) =>
      newDays.get(character.birthday?.[1]!)?.push(character)
    );

    setDays(newDays);
  }, [season]);

  // save active season change
  useEffect(()=> {
    if (season)
    localStorage.setItem('birthdaySeason', season)
  }, [season])

  return (
    <div className=" px-4 my-5">
      {/* Select */}
      <div className="mb-2 ">
        <select
          id="season"
          className="py-2 focus-visible:outline-none"
          onChange={(e) => setSeason(e.target.value as Season)}
          value={season || ''}
        >
          <option value="">Select Season</option>
          {["Spring", "Summer", "Fall", "Winter"].map((season, i) => (
            <option value={season} key={i}>
              {season}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar */}
      <div className="flex flex-wrap">
        {[...days.entries()].map(([day, events], i) => {
          const isFifth = (i + 1) % 5 === 0;
          const isLastRow = day >= 26;
          return (
            <div
              onClick={() => {
                if (events) {
                  setActiveDay(day);
                  setIsShown(true);
                }
              }}
              className={clsx(
                "border-t border-l w-1/5 aspect-square text-xs flex flex-col gap-2 p-1 overflow-y-hidden",
                isFifth && "border-r",
                isLastRow && "border-b"
              )}
              key={i}
            >
              <span>{day}</span>
              {/* Birthdays */}

              {events && season && (
                <div className="flex flex-wrap gap-1 overflow-scroll">
                  {/* Birthday */}
                  {events.map((event, i) => (
                    // For now, it's just this. next time it will be an avatar
                    <div className="border w-1/4 h-auto aspect-square flex items-center justify-center" key={`br-${i}`}>
                      {event.name[0]}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={shown && activeDay ? "block" : "hidden"}>
        {/* From the above, if activateDay is zero, this won't get shown anyway*/}
        <BirthdayModal
          setIsShown={setIsShown}
          characters={days.get(activeDay)!}
        />
      </div>
    </div>
  );
}
