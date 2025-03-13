import { getworkouts } from "@/server/db/utils";
import WorkoutList from "@/components/workout-list";
import { Suspense } from "react";
import { WorkoutListSkeleton } from "@/components/workout-list";

export const dynamic = "force-dynamic";

export default function WorkoutPage() {
  return (
    <div className=" p-6 w-full flex flex-col gap-6 md:mt-8 mb-24">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-3xl font-semibold tracking-tight">
          Explore Workouts
        </h1>
        <p className="text-black/60 text-sm">
          Workouts created by you and others can be found here.
        </p>
      </div>
      <Suspense fallback={<WorkoutListSkeleton numberOfWorkouts={10} />}>
        <Workouts />
      </Suspense>
    </div>
  );
}

async function Workouts() {
  const workouts = await getworkouts();
  return <WorkoutList workouts={workouts} />;
}
