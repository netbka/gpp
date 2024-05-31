import { useAuthStore } from "~/stores/auth";
export const authStore = () => {
  return useAuthStore();
};

import { useTrainingTrackStore } from "~/stores/trainingTrack";
export const trainingTrackStore = () => {
  return useTrainingTrackStore();
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

import { useMuscleStore } from "~/stores/muscle";
export const muscleStore = () => {
  return useMuscleStore();
};

export const selectStore = (storeName: string) => {
  switch (storeName.toLowerCase()) {
    case "training":
      return trainingStore();

    case "exercisetemplate":
      return exerciseTemplateStore();
    default:
      break;
  }
};

// import type { IExerciseTemplate } from "~/types/types";

// import { useCrudStore } from "~/stores/crud";
// export const CrudStore = (resource: string) => {
//   return useCrudStore(resource);
// };
