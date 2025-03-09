import {
  generateWorkout,
  findExercisesByFocusArea,
} from "@/server/generate-workout";
import WorkoutComponent from "../workout/[workoutId]/workout-component";
import { exercises as exerciseDatabase } from "@/server/generate-workout/exercises";

export default function WorkoutGeneratorPage() {
  const userPreferences = {
    workoutLength: "mediumlength" as
      | "shortlength"
      | "mediumlength"
      | "longlength",
    focusAreas: ["upperbody"],
    availableEquipment: [
      "dumbbells",
      "barbell",
      "kettlebell",
      "resistance band",
      "medicine ball",
      "pull-up bar",
      "cable machine",
      "bench",
    ],
    fitnessLevel: "beginner",
    goals: "strength" as "strength" | "endurance" | "weight loss",
    place: "gym" as "home" | "gym",
    injuries: [],
  };

  const exercises = findExercisesByFocusArea(
    userPreferences.focusAreas[0],
    exerciseDatabase
  );

  console.log(exercises);

  const workout = generateWorkout(userPreferences);

  const databasegeneratedworkout = {
    ...workout,
    name: "Cool Full Body Workout",
    description:
      "A workout that focuses on training upperbody, lowerbody and abs",
    focusAreas: userPreferences.focusAreas,
    fitnessGoal: "Improve General Fitness & Health" as FitnessGoal,
    fitnessLevel: userPreferences.fitnessLevel as FitnessLevel,
    workoutLength: userPreferences.workoutLength as WorkoutLength,
    place: userPreferences.place as Place,
    query: "",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <WorkoutComponent workout={databasegeneratedworkout} />
    </div>
  );
}
