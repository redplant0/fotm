import type { Character } from "../types/app-types";

export default function BirthdayModal({
  setIsShown,
  characters,
}: {
  setIsShown: (show: boolean) => void;
  characters: Character[] | undefined;
}) {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex  justify-center">
      <div
        className="absolute top-0 left-0 bg-black opacity-80 w-full h-full"
        onClick={() => setIsShown(false)}
      ></div>
      <div className="w-full overflow-y-scroll h-[calc(100vh-80px-80px)] mx-16 bg-white z-10 mt-20 flex flex-col p-4">
        <div className="h-fit flex gap-4 flex-col">
          {/* birthday */}

          {characters &&
            characters.map((character, i) => (
              <div className="p-4 border flex gap-4" key={i}>
                {/* pfp */}
                <div className="border min-w-8 max-h-8 aspect-square"></div>
                {/* name and details */}
                <details className="self-center group">
                  <summary className="list-none group-open:mb-2">{character.name}</summary>
                  <div className="gap-4 flex flex-col mt-2 group">
                    {/* Likes */}
                    <div className="flex flex-col">
                      <span className="font-semibold mb-1">Likes:</span>
                      <div className="flex flex-col max-h-40 overflow-scroll">
                {character.likes.map((like, i) => <span key={i}>{like}</span> )}

                      </div>
                    </div>

                    {/* Disikes */}
                    <div className="flex flex-col">
                      <span className="font-semibold mb-1">Dislikes:</span>
                      <div className="flex flex-col max-h-40 overflow-scroll">
                {character.dislikes.map((dislike, i) => <span key={i}>{dislike}</span> )}

                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="flex flex-col">
                      <span className="font-semibold mb-1">Schedule:</span>
                      <div className="flex flex-col gap-2 max-h-40 overflow-scroll">
                {character.schedule.map((sched, i) => <span key={i}>{sched}</span> )}

                      </div>
                    </div>
                  </div>
                </details>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
