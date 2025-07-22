import type { Character } from "../types/app-types";

export default function CharactersModal({
  isShown,
  setShown,
  character

}: {
  isShown: boolean;
  setShown: (shown: boolean) => void;
  character?: Character
}) {
  if (!isShown || !character) return null;

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex px-8 justify-center">
      <div
        className="absolute top-0 left-0 h-screen w-screen bg-black opacity-80"
        onClick={() => setShown(false)}
      ></div>

      {/* chacacter */}
      <div className="bg-white w-full h-fit z-10 mt-16 flex flex-col gap-4 p-4">
        <div className="flex items-center gap-8">
          {/* icon */}
          <div className="border size-8"></div>
          <span>{character.name}</span>
        </div>

        {/* Birthday */}
        <div className="flex flex-col gap-1">
          <span>Birthday:</span>
          <span>{character.birthday?.[0]} {character.birthday?.[1]}</span>
        </div>

        {/* Likes */}
        <div className="flex flex-col gap-1">
          <span>Likes:</span>
          {/* likes */}
          <div className="flex flex-col max-h-[160px] overflow-scroll gap-2">

            {
                character.likes.map((like, i) => (

                    <span key={`like-${i}`}>{like}</span>
                ))
            }
          </div>
        </div>

        {/* DiLikes */}
        <div className="flex flex-col gap-1">
          <span>Disikes:</span>
          {/* likes */}
          <div className="flex flex-col max-h-[160px] overflow-scroll gap-2">
            {
                character.dislikes.map((dislike, i) => (

                    <span key={`dislike-${i}`}>{dislike}</span>
                ))
            }
          </div>
        </div>

                {/* Schedule */}
        <div className="flex flex-col gap-1">
          <span>Schedule:</span>
          {/* likes */}
          <div className="flex flex-col max-h-[160px] overflow-scroll gap-2">
            {
                character.schedule.map((sched, i) => (

                    <span key={`sched-${i}`}>{sched}</span>
                ))
            }
          </div>
        </div>


      </div>
    </div>
  );
}
