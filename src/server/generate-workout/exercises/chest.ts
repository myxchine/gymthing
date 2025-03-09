export const chestExercises: Exercise[] = [
  {
    id: "push-up",
    name: "Push-Ups",
    description:
      "A bodyweight exercise where you lower and raise your body by bending and extending your arms, targeting the chest, shoulders, and triceps.",
    muscleGroups: ["chest", "triceps", "shoulders"],
    difficulty: "beginner",
    equipment: [],
    can_train_at_home: true,
    bodyweight: true,
    compound: true,
    unilateral: false,
    importance: 0.25,
  },
  {
    id: "bench-press",
    name: "Bench Press",
    description:
      "A barbell or dumbbell exercise where you press the weight away from your chest while lying on a bench.",
    muscleGroups: ["chest", "triceps", "shoulders"],
    difficulty: "beginner",
    equipment: ["barbell", "bench"],
    can_train_at_home: false,
    bodyweight: false,
    compound: true,
    unilateral: false,
  },
  {
    id: "incline-bench-press",
    name: "Incline Bench Press",
    description:
      "A variation of the bench press performed on an incline bench to target the upper chest more effectively.",
    muscleGroups: ["upper chest", "triceps", "shoulders"],
    difficulty: "intermediate",
    equipment: ["barbell", "incline bench"],
    can_train_at_home: false,
    bodyweight: false,
    compound: true,
    unilateral: false,
  },
  {
    id: "dumbbell-bench-press",
    name: "Dumbbell Bench Press",
    description:
      "A bench press variation using dumbbells, allowing for a greater range of motion and muscle activation.",
    muscleGroups: ["chest", "triceps", "shoulders"],
    difficulty: "beginner",
    equipment: ["dumbbells", "bench"],
    can_train_at_home: true,
    bodyweight: false,
    compound: true,
    unilateral: false,
  },
  {
    id: "incline-dumbbell-press",
    name: "Incline Dumbbell Press",
    description:
      "A dumbbell press performed on an incline bench to target the upper chest.",
    muscleGroups: ["upper chest", "triceps", "shoulders"],
    difficulty: "intermediate",
    equipment: ["dumbbells", "incline bench"],
    can_train_at_home: false,
    bodyweight: false,
    compound: true,
    unilateral: false,
  },
  {
    id: "chest-fly",
    name: "Chest Flies",
    description:
      "An isolation exercise where you extend and bring dumbbells together in an arc motion to target the chest.",
    muscleGroups: ["chest"],
    difficulty: "beginner",
    equipment: ["dumbbells", "bench"],
    can_train_at_home: true,
    bodyweight: false,
    compound: false,
    unilateral: false,
  },
  {
    id: "cable-crossover",
    name: "Cable Crossovers",
    description:
      "A cable machine exercise where you bring the handles together in front of your body to isolate the chest muscles.",
    muscleGroups: ["chest"],
    difficulty: "intermediate",
    equipment: ["cable machine"],
    can_train_at_home: false,
    bodyweight: false,
    compound: false,
    unilateral: false,
  },
  {
    id: "dips",
    name: "Dips (Chest Focus)",
    description:
      "A bodyweight exercise where you lower and raise yourself on parallel bars, emphasizing the chest.",
    muscleGroups: ["chest", "triceps", "shoulders"],
    difficulty: "intermediate",
    equipment: ["dip bars"],
    can_train_at_home: false,
    bodyweight: true,
    compound: true,
    unilateral: false,
    importance: 0.25,
  },
];
