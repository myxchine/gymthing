import SignOut from "./signout";
import { redirect } from "next/navigation";
import { UserIcon } from "@/components/global/icons";
import Link from "next/link";
import { getworkoutsByuser } from "@/server/db/utils";
import { Loading } from "@/components/global/loading";
import { getServerAuthSession } from "@/server/auth";
import { Suspense } from "react";
import WorkoutList, {
  WorkoutListSkeleton,
} from "@/components/workout-generator/workout-list";

export default function AccountPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Account />
    </Suspense>
  );
}

async function Account() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/signin");
  }

  return (
    <div className=" p-6 w-full flex flex-col  gap-8 mb-24">
      <div className="flex flex-row items-center justify-start gap-4  w-full md:my-8">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt="user"
            width={100}
            height={100}
            className="rounded-full size-[100px] md:size-[125px] border border-black object-cover"
          />
        ) : (
          <UserIcon className="size-[100px] md:size-[125px] text-black" />
        )}
        <div className="flex flex-col  items-start justify-start text-left gap-2">
          <h1 className="font-semibold">{session.user.name}</h1>
          <div className="flex flex-row items-center gap-2">
            <Link href="/" className="button-black text-xs">
              Generate workout
            </Link>
            <SignOut />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-2xl font-bold">Your Workouts</h2>
        <Suspense fallback={<WorkoutListSkeleton numberOfWorkouts={10} />}>
          <YourWorkouts session={session} />
        </Suspense>
      </div>
    </div>
  );
}

async function YourWorkouts({
  session,
}: {
  session: { user: { id: string } };
}) {
  const workouts = await getworkoutsByuser(session.user.id);
  if (workouts.length === 0) {
    return (
      <p className="w-full text-center py-8 text-sm text-black/60">
        No workouts found
      </p>
    );
  }
  return <WorkoutList workouts={workouts} />;
}
