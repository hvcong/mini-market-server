function compareDMY(jsDate1, jsDate2) {
  let d1 = jsDate1.getDate();
  let m1 = jsDate1.getMonth();
  let y1 = jsDate1.getFullYear();

  let d2 = jsDate2.getDate();
  let m2 = jsDate2.getMonth();
  let y2 = jsDate2.getFullYear();

  if (y1 == y2 && m2 == m1 && d1 == d2) {
    return 0;
  }

  if (y1 < y2) {
    return -1;
  }

  if (y2 == y1) {
    if (m1 < m2) {
      return -1;
    } else if (m2 == m1) {
      if (d1 < d2) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }

  return 1;
}

function uidNumber() {
  return `${Math.random()}`.substr(2, 7);
}

module.exports = {
  compareDMY,
  uidNumber,
};
