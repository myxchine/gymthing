"use client";

import { Loading } from "@/components/loading";
import { generateUserWorkout } from "@/server/generate-workout/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import RollingPrompts from "./rolling-prompts";

const fitnessGoalOptions: FitnessGoal[] = [
  `Improve General Fitness & Health`,
  `Build Strength & Muscle`,
  `Lose Weight & Tone Body`,
  `Improve Energy Levels & Feel Better`,
];

const fitnessLevelOptions: FitnessLevel[] = [
  "I'm completely new",
  "I kinda know what I'm doing",
  "I know what's up",
];

const workoutLengthOptions: WorkoutLength[] = ["15", "30", "45"];
const placeOptions: Place[] = ["Gym", "Home"];

export default function PersonalWorkoutRoutineForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    fitnessGoal: fitnessGoalOptions[1], // Default value
    fitnessLevel: fitnessLevelOptions[1],
    workoutLength: workoutLengthOptions[2],
    place: placeOptions[0],
    query: "",
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Create a ref for the textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus(); // Focus the textarea when the component mounts
    }
  }, []);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    if (
      !formData.fitnessGoal ||
      !formData.fitnessLevel ||
      !formData.workoutLength ||
      !formData.place ||
      !formData.query
    ) {
      throw new Error(
        "Failed to create your workout routine, please try again"
      );
    }

    try {
      const result = await generateUserWorkout({
        fitnessGoal: formData.fitnessGoal,
        fitnessLevel: formData.fitnessLevel,
        workoutLength: formData.workoutLength,
        place: formData.place,
        query: formData.query,
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
      setIsPending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-xl mx-auto p-4 pb-0 w-full flex flex-col items-centeer justify-end gap-6 h-[calc(100svh-var(--header-height)-var(--footer-height))]">
      {!isPending && !message && (
        <div className="flex flex-col gap-3 w-full h-full items-center justify-center text-center p-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Workout Generator
          </h1>
          <p className="text-black/60 text-sm">
            Simply enter what you're thinking and receive your custom workout!
            <strong> Don't like it? Regenerate it! </strong>
          </p>

          <RollingPrompts
            texts={[
              "I want to train my legs",
              "I'm looking to burn fat",
              "I want to grow my arms",
              "I want to train upperbody",
              "I want to build overall strength",
            ]}
          />
        </div>
      )}
      {(isPending || message) && (
        <div className="flex flex-col gap-3 w-full h-full items-center justify-center text-center p-2">
          {isPending && <Loading />}
          {message && <p className="w-full text-center text-sm">{message}</p>}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="personal-workout-routine-form flex flex-col gap-1 items-center justify-center w-full"
      >
        <label htmlFor="fitness-goal" className="hidden">
          I want to
        </label>
        <select
          name="fitness-goal"
          id="fitness-goal"
          value={formData.fitnessGoal}
          onChange={handleChange}
          className="hidden"
        >
          {fitnessGoalOptions.map((fitnessGoal) => (
            <option key={fitnessGoal} value={fitnessGoal}>
              {fitnessGoal}
            </option>
          ))}
        </select>

        <label htmlFor="fitness-level" className="hidden">
          How deep are you into fitness
        </label>
        <select
          name="fitness-level"
          id="fitness-level"
          value={formData.fitnessLevel}
          onChange={handleChange}
          className="hidden"
        >
          {fitnessLevelOptions.map((fitnessLevel) => (
            <option key={fitnessLevel} value={fitnessLevel}>
              {fitnessLevel}
            </option>
          ))}
        </select>

        <label htmlFor="workout-length" className="hidden">
          I want to workout for
        </label>
        <select
          name="workout-length"
          id="workout-length"
          value={formData.workoutLength}
          onChange={handleChange}
          className="hidden"
        >
          {workoutLengthOptions.map((workoutLength) => (
            <option key={workoutLength} value={workoutLength}>
              {workoutLength} minutes
            </option>
          ))}
        </select>

        <label htmlFor="place" className="hidden">
          I'm working out at
        </label>
        <select
          name="place"
          id="place"
          value={formData.place}
          onChange={handleChange}
          className="hidden"
        >
          {placeOptions.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </select>

        <label htmlFor="query" className="hidden">
          What do you want to train?
        </label>
        <textarea
          name="query"
          id="query"
          ref={textareaRef}
          placeholder="What are you looking for today?"
          className="w-full h-fit px-4 py-4 pb-6 rounded-2xl border border-black/40 mb-2 placeholder:text-black/50 flex flex-col  focus:ring-2 focus:ring-black focus:outline-none"
          required
          value={formData.query}
          onChange={handleChange}
        />

        <button
          type="submit"
          className={
            isPending || formData.query === ""
              ? "rounded-full bg-black text-white border px-6 py-2  w-full !cursor-not-allowed"
              : "rounded-full bg-black text-white border px-6 py-2 hover:bg-white hover:text-black w-full "
          }
          disabled={isPending || formData.query === ""}
        >
          Generate
        </button>
      </form>
    </div>
  );
}
