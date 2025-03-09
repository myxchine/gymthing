"use client";

import ExerciseCard from "@/components/exercise-card";
import { useState } from "react";
import { generateUserWorkout } from "@/server/generate-workout/utils";
import { Loading } from "@/components/loading";
import { useRouter } from "next/navigation";
import { RegenerateIcon } from "@/components/ui/icons";

export default function WorkoutComponent({
  workout,
}: {
  workout: DatabaseStoredGeneratedWorkout;
}) {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    setMessage(null);

    try {
      const result = await generateUserWorkout({
        fitnessGoal: workout.fitnessGoal,
        fitnessLevel: workout.fitnessLevel,
        workoutLength: workout.workoutLength,
        place: workout.place,
        query: workout.query,
      });

      if (result.status === "success") {
        router.push(`/workout/${result.workoutId}`);
      }
      if (result.status === "error") {
        throw new Error(result.message);
      }
    } catch (error: any) {
      console.error("Client-side error:", error);
      setMessage("An unexpected error occurred. Please try again.");
      setIsRegenerating(false);
    }
  };

  if (isRegenerating) {
    return (
      <div className="max-w-xl mx-auto p-4 pb-0 w-full flex flex-col items-center justify-center gap-6 h-[calc(100svh-var(--header-height)-var(--footer-height))]">
        {message ? (
          <p className="w-full text-center text-sm">{message}</p>
        ) : (
          <Loading />
        )}
      </div>
    );
  }

  const mainWokrout = sortExercises(workout.main);

  return (
    <div className="max-w-xl mx-auto p-6 w-full flex flex-col gap-8">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-3xl font-semibold tracking-tight">
          {workout.name}
        </h1>
        <p className="text-black/60 text-sm">{workout.description}</p>

        <button
          onClick={handleRegenerate}
          className="rounded-full border px-4 py-2 hover:bg-black hover:text-white w-fit text-sm mt-1 flex flex-row items-center gap-2"
        >
          <RegenerateIcon className="size-4" /> Regenerate
        </button>
      </div>
      <section className="flex flex-row w-full ">
        <div className="w-[2px] mt-5 mb-3 bg-black" />
        <div className="flex flex-col gap-12 w-full">
          {mainWokrout.map((exercise: GeneratedExercise, index: number) => {
            return <ExerciseCard exercise={exercise} key={index} />;
          })}

          <div className="flex flex-row w-full gap-2 items-end">
            <div className=" mb-3 h-[2px] w-6 bg-black" />
            <h2 className="font-semibold text-xl px-2">
              You finished your workout!{" "}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}

function sortExercises(exercises: Exercise[]): Exercise[] {
  return exercises.slice().sort((a, b) => {
    // Prioritize compound exercises
    if (a.compound && !b.compound) return -1;
    if (!a.compound && b.compound) return 1;

    // If both are compound or both are not, sort by importance (higher importance first)
    return (b.importance || 1) - (a.importance || 1);
  });
}
