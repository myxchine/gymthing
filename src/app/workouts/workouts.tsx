import { getworkouts } from "@/server/db/utils";
import WorkoutList from "@/components/workout-list";
import { Suspense } from "react";
import { WorkoutListSkeleton } from "@/components/workout-list";

export const dynamic = "force-dynamic";

export default async function WorkoutsComponent() {
  return (
    <Suspense fallback={<WorkoutListSkeleton numberOfWorkouts={10} />}>
      <Workouts />
    </Suspense>
  );
}
async function Workouts() {
  const workouts = await getworkouts();
  return <WorkoutList workouts={workouts} />;
}
