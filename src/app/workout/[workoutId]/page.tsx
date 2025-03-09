import { getworkoutById } from "@/server/db/utils";
import { notFound } from "next/navigation";
import WorkoutComponent from "./workout-component";
import { Loading } from "@/components/loading";
import { Suspense } from "react";

export default function WorkoutPage({
  params,
}: {
  params: Promise<{ workoutId: string }>;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <Workout params={params} />
    </Suspense>
  );
}

async function Workout({ params }: { params: Promise<{ workoutId: string }> }) {
  const workoutId = (await params).workoutId;
  const workoutData = await getworkoutById(workoutId);
  const workout = workoutData?.workoutJson as DatabaseStoredGeneratedWorkout;
  if (!workout) {
    return notFound();
  }
  return <WorkoutComponent workout={workout} />;
}
