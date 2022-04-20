export const formatLongStr = (val: string, mid = "...", start = 6, end = 6) => {
  if (val.length <= start + end) {
    return val;
  }
  return `${val.substring(0, start)}${mid}${val.substring(val.length - end)}`;
};
