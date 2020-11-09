import { DateEnum } from "../enums/DateEnum";
import moment from "moment-timezone";

export const extractId = (location) => {
  let position = location.lastIndexOf("/");
  return location.substring(position + 1, location.length);
};

export const formatDateToUTC = (inputDate) => {
  const newDate = new Date(inputDate);
  return new Date(
    Date.UTC(
      newDate.getUTCFullYear(),
      newDate.getUTCMonth(),
      newDate.getUTCDate(),
      12,
      0,
      0
    )
  );
};

export const formatDateToDisplay = (inputDate, withHour) => {
  if (withHour) {
    return moment(inputDate).format(DateEnum.MOMENTFORMATHOUR);
  }

  return moment.utc(inputDate).format(DateEnum.MOMENTFORMAT);
};

export const isValidDate = (inputDate) => {
  return inputDate instanceof Date && !isNaN(inputDate);
};

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1;
  }
  return new File([u8arr], filename, { type: mime });
};

export const getImageFromFile = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(dataURLtoFile(reader.result, file.name));
    };

    reader.readAsDataURL(file);
  });
};
