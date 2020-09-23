export const extractId = (location) => {
  let position = location.lastIndexOf("/");
  return location.substring(position + 1, location.length);
};
