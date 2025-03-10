import { redirect } from "next/navigation";
import GoogleButton from "./googlebutton";
import { getServerAuthSession } from "@/server/auth";
import { Loading } from "@/components/loading";
import { Suspense } from "react";
export default function SignInPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SignIn />
    </Suspense>
  );
}
async function SignIn() {
  const session = await getServerAuthSession();
  if (session) {
    return redirect("/account");
  }
  return (
    <main className="flex flex-col items-center justify-center gap-6 my-24 p-8">
      <div className="flex flex-col items-center gap-2 text-center max-w-md">
        <h1 className="heading1">Sign Up</h1>
        <p>
          Sign in or create a new account to get more personalised workouts and
          save them for later!
        </p>
      </div>
      <GoogleButton />
    </main>
  );
}
