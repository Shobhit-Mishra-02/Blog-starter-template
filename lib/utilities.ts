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

// const getPages = (blogs: blog[], n: number) => {
//   let iter: number;

//   if (blogs.length % n == 0) iter = blogs.length / n;
//   else iter = blogs.length / n + 1;

//   let partition = iter;
//   let res = [];
//   let low = 0,
//     high = iter;
//   let pos = 1;

//   while (iter--) {
//     let temp: blog[] = [];

//     for (let i = low; i < high; i++) temp.push(blogs[i]);

//     low = high;
//     high += partition;
//     if (high > blogs.length) high = blogs.length;

//     if (pos == 1) {
//       res.push({
//         blogs: temp,
//         next: true,
//         prev: false,
//       });
//     } else if (pos == blogs.length) {
//       res.push({
//         blogs: temp,
//         next: false,
//         prev: true,
//       });
//     } else {
//       res.push({
//         blogs: temp,
//         next: true,
//         prev: true,
//       });
//     }

//     pos++;
//   }

//   return res;
// };
