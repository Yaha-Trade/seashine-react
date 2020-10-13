import { DateEnum } from "../enums/DateEnum";
import moment from "moment-timezone";

export const extractId = (location) => {
  let position = location.lastIndexOf("/");
  return location.substring(position + 1, location.length);
};

export const formatDateToDisplay = (inputDate) => {
  return moment.utc(inputDate).format(DateEnum.MOMENTFORMAT);
};
