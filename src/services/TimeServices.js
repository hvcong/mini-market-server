const TimeServices = {
  compareDate: (stringA, stringB) => {
    try {
      const a = new Date(stringA);
      const b = new Date(stringB);
      if (a.getTime() === b.getTime()) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return fasle;
    }
  },
  toString: (date) => {
    return date.toISOString().substring(0, 10);
  },
};

module.exports = TimeServices;
