import { getworkoutById } from "@/server/db/utils";
import { notFound } from "next/navigation";
import WorkoutComponent from "./workout-component";

export const dynamic = "force-dynamic";

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  const workoutId = (await params).workoutId;
  const workoutData = await getworkoutById(workoutId);
  const workout = workoutData?.workoutJson as DatabaseStoredGeneratedWorkout;
  if (!workout) {
    return notFound();
  }
  return <WorkoutComponent workout={workout} />;
}

