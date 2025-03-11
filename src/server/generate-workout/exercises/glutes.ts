
export const gluteExercises: Exercise[] = [
  {
    id: "squat",
    name: "Squat",
    description:
      "A compound movement where you lower your hips from a standing position and then return to standing.",
    muscleGroups: ["quadriceps", "hamstrings", "glutes", "calves"],
    difficulty: "beginner",
    equipment: ["barbell", "dumbbells", "bodyweight"],
    can_train_at_home: true,
    bodyweight: true,
    compound: true,
    unilateral: false,
  },
  {
    id: "lunges",
    name: "Lunges",
    description:
      "A unilateral movement where you step forward or backward and lower your body before returning to the start.",
    muscleGroups: ["quadriceps", "hamstrings", "glutes"],
    difficulty: "beginner",
    equipment: ["dumbbells", "bodyweight"],
    can_train_at_home: true,
    bodyweight: true,
    compound: true,
    unilateral: true,
    
  },
  {
    id: "deadlift",
    name: "Deadlift",
    description:
      "A compound lift where you pick a barbell off the ground to a standing position, engaging multiple muscle groups.",
    muscleGroups: ["hamstrings", "glutes", "lower back", "quadriceps"],
    difficulty: "intermediate",
    equipment: ["barbell", "dumbbells"],
    can_train_at_home: false,
    bodyweight: false,
    compound: true,
    unilateral: false,
  },
  {
    id: "leg-press",
    name: "Leg Press",
    description:
      "A machine-based exercise where you push a weighted platform away using your legs.",
    muscleGroups: ["quadriceps", "hamstrings", "glutes"],
    difficulty: "beginner",
    equipment: ["leg press machine"],
    can_train_at_home: false,
    bodyweight: false,
    compound: true,
    unilateral: false,
  },
  {
    id: "step-up",
    name: "Step-Up",
    description:
      "A unilateral movement where you step onto an elevated surface to engage the legs and glutes.",
    muscleGroups: ["quadriceps", "hamstrings", "glutes"],
    difficulty: "beginner",
    equipment: ["dumbbells", "bodyweight"],
    can_train_at_home: true,
    bodyweight: true,
    compound: true,
    unilateral: true,
    importance: 0.1,
  },
  {
    id: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    description:
      "A challenging unilateral exercise where you squat with one foot elevated behind you.",
    muscleGroups: ["quadriceps", "hamstrings", "glutes"],
    difficulty: "intermediate",
    equipment: ["dumbbells", "bodyweight"],
    can_train_at_home: true,
    bodyweight: true,
    compound: true,
    unilateral: true,
  },
];
