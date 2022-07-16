//This function formats the date when if comes from the sanity.
// example: 2022-07-12(YYYY-MM-DD) -> 12 Jun, 2022
export const getDate = (inputString: string) => {
  if (!inputString) return "";
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let res = "";
  const arr: string[] = inputString.split("-");
  const index = +arr[1];
  res += arr[2] + " " + months[index] + ", " + arr[0];

  return res;
};
