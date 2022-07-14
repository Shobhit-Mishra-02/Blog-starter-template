export const getDate = (inputString: string) => {
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
  res += arr[2] + " " + months[index] + ", " + arr[0]; //12 Jun, 2022

  return res;
};
