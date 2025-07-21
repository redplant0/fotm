import { useEffect, useState } from "react";
import type { ReferenceCrop, Season } from "../types/app-types";
import { getAllCrops } from "../lib/repo";
import clsx from "clsx";

export default function CropsPage() {
  const [stateCrops, setCrops] = useState<Map<Season, ReferenceCrop[]>>(new Map())

  // Get all crops
  useEffect(() => {
    const crops = new Map<Season, ReferenceCrop[]>([['Spring', []], ['Summer', []], ['Fall', []]])


    getAllCrops().forEach((crop) => crops.get(crop.season)?.push(crop))

    setCrops(crops);
  }, []);

  return (
    <div className="mt-10 px-4">
      {/* Table */}
      <div className="overflow-scroll">
        {/* Heading */}
        <div className="flex gap-2 w-fit">
          <span className="w-[6rem] px-2 py-1 border flex items-center">Name</span>
          <span className="w-[6rem] px-2 py-1 border flex items-center">Harvest Time</span>
          <span className="w-[6rem] px-2 py-1 border flex items-center">Regrowth Time</span>
          <span className="w-[6rem] px-2 py-1 border flex items-center">Seed Cost</span>
          <span className="w-[6rem] px-2 py-1 border flex items-center">Sell Price</span>
        </div>

        {/* Contents */}
        <div className="flex flex-col gap-4 mt-4">
        {stateCrops &&
          [...stateCrops.entries()].map(([key, value], i) => {
            return (
              <div key={i}>
                <span>{key}</span>

                {value &&
                  value.map((item, i) => (
                    <div key={i} className="flex gap-2 w-fit">
                      <span
                        className={clsx(
                          "w-[6rem] px-2 py-1 border",
                          i === value.length - 1 ? "border-b" : "border-b-0"
                        )}
                      >
                        {item.name}
                      </span>
                      <span
                        className={clsx(
                          "w-[6rem] px-2 py-1 border text-center",
                          i === value.length - 1 ? "border-b" : "border-b-0"
                        )}
                      >
                        {item.harvest_time}
                      </span>
                      <span
                        className={clsx(
                          "w-[6rem] px-2 py-1 border text-center",
                          i === value.length - 1 ? "border-b" : "border-b-0"
                        )}
                      >
                        {item.regrowth_time}
                      </span>
                      <span
                        className={clsx(
                          "w-[6rem] px-2 py-1 border text-center",
                          i === value.length - 1 ? "border-b" : "border-b-0"
                        )}
                      >
                        {item.seed_cost}G
                      </span>
                      <span
                        className={clsx(
                          "w-[6rem] px-2 py-1 border text-center",
                          i === value.length - 1 ? "border-b" : "border-b-0"
                        )}
                      >
                        {item.sell_price}G
                      </span>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
