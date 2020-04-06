const programs = [
  ["Transit (NJ Transit)", "T2029", "DVRPC"],
  ["Highway", "2029", "DVRPC"],
  ["Highway", "L2029", "DVRPC"],
  ["Transit (DRPA/PATCO)", "DR2029", "DVRPC"],
  ["Statewide", "2029", "Statewide"],
  ["Study and Development", "SD20", "DVRPC"]
];

const programLookup = (planCode, mpoFinan) => {
  let output = "";
  var i = 0;
  const length = programs.length;

  for (i; i < length; i++) {
    const entry = programs[i];

    if (planCode === entry[1] && mpoFinan === entry[2]) {
      output = entry[0];
      break;
    }
  }

  return output;
};

export { programLookup };
