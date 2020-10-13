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

export const formatDateToDisplay = (inputDate) => {
  return moment.utc(inputDate).format(DateEnum.MOMENTFORMAT);
};
