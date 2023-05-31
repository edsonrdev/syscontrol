// const loanSimulation = () => {
//   let v = +total,
//     p = +portion,
//     r = 0;
//   let rowCalc = "";
//   let loanArr = [];

//   while (v >= p) {
//     r = v + v * 0.1 - p;
//     rowCalc = `${v.toFixed(2)} + 10% - ${p.toFixed(2)} = ${r.toFixed(2)}`;
//     loanArr.push(rowCalc);
//     v = r;
//   }

//   // setLoan([]);

//   setLoan([...loanArr]);
// };

export const convertDate = (date) => {
  const newDate = new Date(date);

  const d =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const m =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const y = newDate.getFullYear();

  return `${d}/${m}/${y}`;
};
