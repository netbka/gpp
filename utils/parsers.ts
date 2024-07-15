export function numToMin(val: number) {
  return Math.floor(val / 60);
}
export function numToSec(val: number) {
  //console.log(val);
  return Math.floor(val % 60);
}

export function numToMinText(val: number) {
  return Math.floor(val / 60) > 9.9 ? Math.floor(val / 60) : "0" + Math.floor(val / 60);
}
export function numToSecText(val: number) {
  //console.log(val);
  return Math.floor(val % 60) > 9.9 ? Math.floor(val % 60) : "0" + Math.floor(val % 60);
}

export const durationToText = (duration: number) => {
  var minutes = Math.floor(duration / 60);
  var seconds = duration - minutes * 60;
  return minutes + " min " + (seconds < 10 ? "0" + seconds : seconds) + " sec.";
};

export const durationToTextCounter = (duration: number) => {
  var minutes = Math.floor(duration / 60);
  var seconds = duration - minutes * 60;
  return numToMinText(minutes) + ":" + numToSecText(seconds);
};

export const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

export const getFirstWords = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Get all div elements (assuming text can be spread across multiple divs)
  const divs = doc.querySelectorAll("div");

  // Initialize variables
  let totalWords = 0;
  let resultString = "";

  // Iterate through divs and accumulate content
  for (let i = 0; i < divs.length; i++) {
    const currentDiv = divs[i];

    // Clone the div element to avoid modifying the original
    const clonedDiv = currentDiv.cloneNode(true);

    // Truncate the child nodes of the cloned div
    let child = clonedDiv.firstChild;
    while (child && totalWords < 60) {
      if (child.nodeType === Node.TEXT_NODE) {
        const words = child.nodeValue.trim().split(" ");
        const wordsToTake = Math.min(60 - totalWords, words.length);
        totalWords += wordsToTake;
        child.nodeValue = words.slice(0, wordsToTake).join(" ") + (wordsToTake < words.length ? "..." : "");
      }
      child = child.nextSibling;
    }

    // Remove any remaining child nodes after truncation
    while (clonedDiv.lastChild && totalWords >= 60) {
      clonedDiv.removeChild(clonedDiv.lastChild);
    }

    // Append the processed content of the current div
    resultString += clonedDiv.outerHTML;

    // Break the loop if total words exceed 60
    if (totalWords >= 60) {
      break;
    }
  }

  // Return the combined content (up to 60 words)
  return resultString;
};

import DOMPurify from "dompurify";
export const sanitizeHtml = (val) => {
  return DOMPurify.sanitize(val, {
    FORBID_ATTR: ["style", "class", "path", "data-sourcepos"], //"a", "href",
    FORBID_TAGS: ["style", "class", "path"],
  });
};
