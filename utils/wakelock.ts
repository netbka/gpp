import { useWakeLock } from "@vueuse/core";

let wakelockPC;
export const requestWakeLock = async (enable: boolean) => {
  const wakeLock = reactive(useWakeLock());

  if (navigator.wakeLock) {
    try {
      if (enable === true) wakelockPC = await navigator.wakeLock.request("screen");

      if (enable === false) wakelockPC.release().then(() => console.log("Screen Wake Lock released"));
    } catch (error) {
      console.error("Error acquiring Wake Lock:", error);
    }
  } else {
    return wakeLock.isActive ? wakeLock.release() : wakeLock.request("screen");
  }
};
