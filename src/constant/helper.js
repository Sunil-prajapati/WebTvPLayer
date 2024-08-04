import moment from "moment";
import { REGEX } from "./enum";
import noPoster from "../assets/images/noPoster.png";

export const withHttp = (url) =>
  !/^https?:\/\//i.test(url) ? `http://${url}` : url;

export const screenWidth = window.innerWidth;

export const onReady = (event) => {
  event.target.pauseVideo();
};

export const storeDataInLocalStorage = (key, data) => {
  try {
    const dataString = JSON.stringify(data);
    localStorage.setItem(key, dataString);
    return true;
  } catch (error) {
    return false;
  }
};

export const getLocalStorageValue = (key) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const isBrowser = typeof window !== "undefined";

export const convertTimeStamp = (timStamp) => {
  return moment.unix(timStamp).format("h:mm:a");
};

export const getUnlockedCategories = (categories, lockedCategories) => {
  const uniqueArray = [];
  for (const object of categories) {
    if (
      !lockedCategories?.some(
        (otherObject) => object?.category_id === otherObject?.category_id
      )
    ) {
      uniqueArray.push(object);
    }
  }
  return uniqueArray;
};

export const decodeM3uResponse = (apiResponse) => {
  const dataArray = [];
  const lines = apiResponse.split("\n");
  let currentObject = {};
  for (const line of lines) {
    if (line.startsWith("#EXTINF")) {
      currentObject = {};
      const matches = line.match(REGEX.DECODE_M3U);
      matches?.forEach((match) => {
        const [key, value] = match?.split("=");
        currentObject[key.replace(/-/g, "_")] = value?.replace(/"/g, "");
      });
    } else if (line.startsWith("http")) {
      currentObject["link"] = line;
      dataArray?.push(currentObject);
    }
  }
  return dataArray;
};

export function addDefaultSrc(ev) {
  ev.target.src = noPoster;
}

export const arrangeByGroupTitle = (originalArray) => {
  const groupedArrays = {};
  originalArray.forEach((item) => {
    const groupTitle = item.group_title;
    if (!groupedArrays[groupTitle]) {
      groupedArrays[groupTitle] = [];
    }
    groupedArrays[groupTitle].push(item);
  });
  return Object.values(groupedArrays) || null;
};

export const stringTruncate = (text, numberOfString) => {
  let finalString;
  if (text?.length > numberOfString) {
    finalString = text?.substring(0, numberOfString) + "...";
  } else {
    finalString = text;
  }
  return finalString;
};

export const secondsToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} min  ${remainingSeconds} sec`;
};
