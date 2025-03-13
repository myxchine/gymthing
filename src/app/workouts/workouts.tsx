import { getworkouts } from "@/server/db/utils";
import WorkoutList from "@/components/workout-list";

export const dynamic = "force-dynamic";
export default async function Workouts() {
  const workouts = await getworkouts();
  return <WorkoutList workouts={workouts} />;
}
