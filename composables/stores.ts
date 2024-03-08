import { useTrainingStore } from "~/stores/training";

export const trainingStore = () => {
  return useTrainingStore();
};

import { useExerciseStore } from "~/stores/exercise";

export const exerciseStore = () => {
  return useExerciseStore();
};

import { useExerciseGroupStore } from "~/stores/exerciseGroup";

export const exerciseGroupStore = () => {
  return useExerciseGroupStore();
};
