export function useAudio(pathToAudio: string) {
  const audio = new Audio(pathToAudio);
  const audioDuration = ref(0);

  const initAudio = async () => {
    audio.load();
    audio.addEventListener("loadedmetadata", () => {
      audioDuration.value = audio.duration;
    });
  };
  initAudio();

  const stopAudio = () => {
    audio.pause();
    audio.currentTime = 0;
  };
  const startAudio = () => {
    audio.play();
  };

  const startAudioConditional = (interval: number) => {
    if (interval < audioDuration.value) audio.play();
  };

  const pauseAudio = (inteval: number) => {
    if (inteval < audioDuration.value) {
      audio.currentTime = audioDuration.value - inteval;
      audio.pause();
    }
  };

  return {
    pauseAudio,
    stopAudio,
    startAudio,
    startAudioConditional,
  };
}

export const useCoreAudio = () => {};
