export function useTrainingExercise() {
  const store = useTrainingStore();
  const grpIndex = ref(0);
  const exrIndex = ref(0);
  let counterDuration = ref(0);
  const showResult = ref(true);
  let timer = ref(100);

  const initDuration = computed(() => store.getActiveExerciseDuration());
  const backwardDisabled = computed(() => {
    if (store.activeGroup.repeats === undefined) return true;

    return grpIndex.value === 0 && exrIndex.value === 0 && store.activeGroup.repeats === store.currentItem.exerciseGroup[grpIndex.value].repeats;
  });

  const isLastExerciseInGroup = () => {
    return exrIndex.value + 1 > store.activeGroup.exercise.length;
  };
  const isLastGroup = () => {
    return exrIndex.value + 1 > store.activeGroup.exercise.length;
  };

  const resetCounter = () => {
    timer.value = 100;
    grpIndex.value = 0;
    exrIndex.value = 0;
  };

  const updateCounterTimer = () => {
    counterDuration.value--;
    timer.value = (counterDuration.value / initDuration.value) * 100;
  };

  const restartTraining = () => {
    showResult.value = false;
    store.resetActive();
    resetCounter();
    store.isStarted = false;
    grpIndex.value = store.getInitialActiveGroup();
  };
  const showExerciseName = () => {
    const index = store.getActiveExerciseIndex();
    try {
      return index > 0 ? store.activeGroup.exercise[index].name : store.activeGroup.exercise[0].name;
    } catch (error) {}
  };
  const endOfTraining = () => {
    showResult.value = true;
    store.resetActive();
  };
  const isBeginningOfTraining = () => {
    return grpIndex.value === 0 && exrIndex.value === 0 && counterDuration.value === initDuration.value;
  };

  const isEndOfTraining = () => {
    if (grpIndex.value < 0 || (grpIndex.value + 1 > store.currentItem.exerciseGroup.length && store.activeGroup.repeats === 0)) {
      endOfTraining();
      return true;
    }
    return false;
  };
  const backwardExercise = () => {
    if (grpIndex.value === 0 && exrIndex.value === 0 && store.activeGroup.repeats === store.currentItem.exerciseGroup[grpIndex.value].repeats) return;
    store.resetActive();
    timer.value = 100;
    if (exrIndex.value > 0) {
      exrIndex.value -= 1;
    } else if (store.activeGroup.repeats !== store.currentItem.exerciseGroup[grpIndex.value].repeats) {
      store.activeGroup.repeats += 1;
      exrIndex.value = store.activeGroup.exercise.length - 1;
    } else if (grpIndex.value > 0 && exrIndex.value === 0) {
      grpIndex.value = store.getPrevGroupByIndex(grpIndex.value - 1);

      if (grpIndex.value === -1) {
        exrIndex.value = 0;
        grpIndex.value = store.getNextGroupByIndex(grpIndex.value + 1);
      } else {
        exrIndex.value = store.activeGroup.exercise.length - 1;
        store.activeGroup.repeats = 1;
      }
    }
    store.setActiveGroup(true);
    store.setActiveExercise(exrIndex.value, true);
    return;
  };

  watch(
    () => store.getActiveExerciseDuration(),
    (newVal) => {
      counterDuration.value = newVal;
    },
    { deep: true }
  );

  watch(
    () => store.getCurrentItem,
    () => {
      if (!store.isStarted) grpIndex.value = store.getInitialActiveGroup();
    },
    { deep: true }
  );

  return {
    showExerciseName,
    isLastExerciseInGroup,
    isLastGroup,
    isBeginningOfTraining,
    isEndOfTraining,
    exrIndex,
    grpIndex,
    counterDuration,
    showResult,
    timer,
    initDuration,
    restartTraining,
    endOfTraining,
    updateCounterTimer,
    backwardExercise,
    backwardDisabled,
  };
}
