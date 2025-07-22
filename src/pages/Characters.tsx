import { useCallback, useEffect, useState } from "react";
import type { Character } from "../types/app-types";
import { getAllCharacters } from "../lib/repo";
import CharactersModal from "../components/CharactersModal";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Map<string, Character[]>>(
    new Map()
  );

  // Modal attribute
  const [isShown, setIsShown] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>();

  // Set it up
  useEffect(() => {
    const rawCharacters = getAllCharacters();

    const newCharacters = new Map<string, Character[]>();

    rawCharacters.forEach((character) => {
      if (!newCharacters.has(character.name[0])) {
        newCharacters.set(character.name[0], []);
      }
      newCharacters.get(character.name[0])!.push(character);
    });

    const sorted = new Map(
      [...newCharacters.entries()].sort(([a], [b]) => a.localeCompare(b))
    );

    setCharacters(sorted);
  }, []);

  const handleClick = useCallback((key: string, i: number) => {
    const s = characters.get(key)?.[i];
    if (s) setSelectedCharacter(s);
    setIsShown(true)
  }, [characters]);

  return (
    <div className="p-4 h-[calc(100vh-64px)] overflow-scroll">
      <h3 className="mb-4 text-md font-semibold">Characters</h3>

      {/* Items */}
      <div className="flex flex-col gap-4">
        {characters &&
          [...characters.entries()].map(([key, value], i) => (
            <div key={i} >
              {/* Letter? */}
              <span className="mb-4 block font-semibold">{key}</span>

              {/* Characters */}
              <div className="flex flex-col gap-4">
                {value.map((character, i) => (
                  <div className="flex gap-4 items-center" key={`char-${i}`} onClick={() => handleClick(key, i)}>
                    {/* Icon */}
                    <div className="border size-8"></div>

                    {/* Name */}
                    <span>{character.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      <CharactersModal
        isShown={isShown}
        setShown={setIsShown}
        character={selectedCharacter}
      />
    </div>
  );
}
