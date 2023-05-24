const loanSimulation = () => {
  let v = +total,
    p = +portion,
    r = 0;
  let rowCalc = "";
  let loanArr = [];

  while (v >= p) {
    r = v + v * 0.1 - p;
    rowCalc = `${v.toFixed(2)} + 10% - ${p.toFixed(2)} = ${r.toFixed(2)}`;
    loanArr.push(rowCalc);
    v = r;
  }

  // setLoan([]);

  setLoan([...loanArr]);
};
