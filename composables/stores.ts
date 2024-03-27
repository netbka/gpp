import { useAuthStore } from "~/stores/auth";
export const authStore = () => {
  return useAuthStore();
};

import { useWorkoutStore } from "~/stores/workout";
export const workoutStore = () => {
  return useWorkoutStore();
};

import { useTrainingStore } from "~/stores/training";
export const trainingStore = () => {
  return useTrainingStore();
};

import { useExerciseStore } from "~/stores/exercise";

export const exerciseStore = () => {
  return useExerciseStore();
};

import { useExerciseTemplateStore } from "~/stores/exerciseTemplate";

export const exerciseTemplateStore = () => {
  return useExerciseTemplateStore();
};

import { useExerciseGroupStore } from "~/stores/exerciseGroup";

export const exerciseGroupStore = () => {
  return useExerciseGroupStore();
};

import { useProfileStore } from "~/stores/profile";
export const profileStore = () => {
  return useProfileStore();
};

import { useSportTypeStore } from "~/stores/sportType";
export const sportTypeStore = () => {
  return useSportTypeStore();
};
