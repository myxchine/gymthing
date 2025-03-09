import { getworkouts } from "@/server/db/utils";
import Link from "next/link";
import { Loading } from "@/components/loading";
import { Suspense } from "react";
export default function WorkoutPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Workout />
    </Suspense>
  );
}
async function Workout() {
  const workouts = await getworkouts();
  return (
    <div className="max-w-xl mx-auto p-6 w-full flex flex-col gap-6">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-4xl font-semibold tracking-tight">
          Explore Workouts
        </h1>
        <p className="text-black/60 text-sm">
          Workouts created by you and others can be found here.
        </p>
      </div>
      <div className="flex flex-col gap-8 w-full">
        {workouts.map((workout) => (
          <Link
            href={`/workout/${workout.id}`}
            key={workout.id}
            className="flex flex-col gap-2 w-full"
          >
            <h2 className="text-xl font-semibold tracking-tight">
              {workout.workoutJson.name}
            </h2>
            <p className="text-black/60 text-sm">
              {workout.workoutJson.description}
            </p>
            <span className="px-4 py-2 rounded-full text-sm mt-2 w-fit hover:bg-black hover:text-white border">
              View workout
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
