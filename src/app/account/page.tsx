import SignOut from "./signout";
import { redirect } from "next/navigation";
import { UserIcon } from "@/components/ui/icons";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getworkoutsByuser } from "@/server/db/utils";
import { Loading } from "@/components/loading";
import { getServerAuthSession } from "@/server/auth";
import { Suspense } from "react";

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
    <div className="max-w-xl mx-auto p-6 w-full flex flex-col gap-6">
      <div className="flex flex-row items-center justify-start gap-4  w-full ">
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
          <h1>{session.user.name}</h1>
          <div className="flex flex-row items-center gap-2">
            <Link href="/" className="button-black text-xs">
              Generate workout
            </Link>
            <SignOut />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Your Workouts</h2>
          <p className="pill">Latest</p>
        </div>

        <YourWorkouts session={session} />
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
    return <p className="w-full text-center py-8 text-sm text-black/60">No workouts found</p>;
  }
  return (
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
  );
}
