import { exercises, workouts } from "./exercises";

export function getMuscleGroup(exerciseId: string): string | null {
  for (const muscleGroupKey in exercises) {
    const muscleGroup = exercises[muscleGroupKey];
    if (
      muscleGroup.exercises &&
      muscleGroup.exercises.some((exercise) => exercise.id === exerciseId)
    ) {
      return muscleGroupKey;
    } else if (
      muscleGroupKey === "upperbody" ||
      muscleGroupKey === "lowerbody"
    ) {
      for (const subGroupKey in muscleGroup) {
        if (subGroupKey !== "importance" && subGroupKey !== "exercises") {
          const subGroup = muscleGroup[subGroupKey];
          if (
            subGroup &&
            typeof subGroup === "object" &&
            subGroup.exercises &&
            subGroup.exercises.some(
              (exercise: Exercise) => exercise.id === exerciseId
            )
          ) {
            return subGroupKey;
          } else if (subGroupKey === "arms" && typeof subGroup === "object") {
            for (const armSubGroupKey in subGroup) {
              if (
                armSubGroupKey !== "importance" &&
                armSubGroupKey !== "exercises"
              ) {
                const armSubGroup = subGroup[armSubGroupKey];
                if (
                  armSubGroup &&
                  typeof armSubGroup === "object" &&
                  armSubGroup.exercises &&
                  armSubGroup.exercises.some(
                    (exercise: Exercise) => exercise.id === exerciseId
                  )
                ) {
                  return armSubGroupKey;
                }
              }
            }
          }
        }
      }
    }
  }
  return null;
}

// Helper function to get exercises from a muscle group
function getExercisesFromMuscleGroup(muscleGroup: MuscleGroup): Exercise[] {
  const allExercises: Exercise[] = [];

  if (muscleGroup?.exercises && Array.isArray(muscleGroup.exercises)) {
    allExercises.push(...muscleGroup.exercises);
  }

  for (const key in muscleGroup) {
    if (
      key !== "importance" &&
      key !== "exercises" &&
      typeof muscleGroup[key] === "object"
    ) {
      const nestedGroup = muscleGroup[key] as MuscleGroup; // Type assertion

      if (nestedGroup) {
        if (nestedGroup.exercises && Array.isArray(nestedGroup.exercises)) {
          allExercises.push(...nestedGroup.exercises);
        }

        for (const nestedKey in nestedGroup) {
          if (
            nestedKey !== "importance" &&
            nestedKey !== "exercises" &&
            typeof nestedGroup[nestedKey] === "object"
          ) {
            const deepNestedGroup = nestedGroup[nestedKey] as MuscleGroup; // Type assertion

            if (
              deepNestedGroup?.exercises &&
              Array.isArray(deepNestedGroup.exercises)
            ) {
              allExercises.push(...deepNestedGroup.exercises);
            }
          }
        }
      }
    }
  }

  return allExercises;
}

// Check if an exercise meets user criteria
export function meetsUserCriteria(
  exercise: Exercise,
  userPreferences: UserPreferences
): boolean {
  if (!exercise.can_train_at_home && userPreferences.place === "home") {
    return false;
  }
  return true;
}

// Generate a workout based on user preferences
export function generateWorkout(
  userPreferences: UserPreferences
): GeneratedWorkout {
  const workoutLength = workouts[userPreferences.workoutLength];
  const mainExercises: Exercise[] = [];
  const allMatchingExercises: Exercise[] = [];

  for (const focusArea of userPreferences.focusAreas) {
    const foundExercises = findExercisesByFocusArea(focusArea, exercises);
    allMatchingExercises.push(...foundExercises);
  }

  const availableExercises = allMatchingExercises.filter((exercise) =>
    meetsUserCriteria(exercise, userPreferences)
  );

  if (availableExercises.length > 0) {
    const exercisePool = [...availableExercises];
    const targetExerciseCount = workoutLength.mainWorkout.totalexercises;

    for (let i = 0; i < targetExerciseCount && exercisePool.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * exercisePool.length);
      mainExercises.push(exercisePool[randomIndex]);
      exercisePool.splice(randomIndex, 1);
    }
  }

  return {
    main: mainExercises,
  };
}

function findExercisesByFocusArea(
  focusArea: string,
  exercisesDatabase: ExercisesDatabase
): Exercise[] {
  let foundExercises: Exercise[] = [];

  for (const categoryKey in exercisesDatabase) {
    if (categoryKey === focusArea) {
      const muscleGroupData = exercisesDatabase[categoryKey];
      if (muscleGroupData) {
        foundExercises.push(...getExercisesFromMuscleGroup(muscleGroupData));
      }
    } else if (typeof exercisesDatabase[categoryKey] === "object") {
      const category = exercisesDatabase[categoryKey] as MuscleGroup; // Type assertion
      for (const subCategoryKey in category) {
        if (subCategoryKey === focusArea) {
          const subCategory = category[subCategoryKey] as MuscleGroup; // Type assertion
          if (subCategory) {
            foundExercises.push(...getExercisesFromMuscleGroup(subCategory));
          }
        } else if (typeof category[subCategoryKey] === "object") {
          const subCategory = category[subCategoryKey] as MuscleGroup; // Type assertion
          if (subCategory) {
            foundExercises.push(
              ...findExercisesByFocusArea(focusArea, {
                [subCategoryKey]: subCategory,
              })
            );
          }
        }
      }
    }
  }

  return foundExercises;
}
