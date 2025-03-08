export default function ExerciseCard({
  exercise,
}: {
  exercise: GeneratedExercise;
}) {
  return (
    <div className="flex flex-row w-full gap-2">
      <div className=" mt-5 h-[2px] w-6 bg-black" />

      <div className=" flex flex-col gap-2 w-full ">
        <div className="flex flex-col w-full p-2 gap-3 ">
          <h2 className="font-semibold text-xl">{exercise.name}</h2>
          <ExerciseMuscleGroups muscleGroups={exercise.muscleGroups} />
          <p className="text-black/60 text-sm">{exercise.description}</p>
        </div>
        <div className=" p-6 rounded-2xl bg-black/5 flex flex-col gap-4 w-full">
          <p className="w-full bg-black/5 rounded-2xl px-4 py-3">3 sets of</p>
          {exercise.hasDuration ? (
            <p className="w-full bg-black/5 rounded-2xl px-4 py-3">
              5 minutes (or to failure)
            </p>
          ) : exercise.compound ? (
            <p className="w-full bg-black/5 rounded-xl px-4 py-3">
              8 - 12 reps{" "}
            </p>
          ) : (
            <p className="w-full bg-black/5 rounded-xl px-4 py-3">
              10 - 14 reps
            </p>
          )}

          <p className="w-full bg-black/5 rounded-xl px-4 py-3">
            rest for atleast 2 minutes between sets
          </p>

          {!exercise.bodyweight && (
            <p className="text-xs ">
              Pick a weight that takes you to failure on each set
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ExerciseMuscleGroups({ muscleGroups }: { muscleGroups: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {muscleGroups.map((muscleGroup) => (
        <p
          key={muscleGroup}
          className="px-3  capitalize py-1 rounded-full bg-black/10 text-xs text-black/60  w-fit"
        >
          {muscleGroup}
        </p>
      ))}
    </div>
  );
}
