const getCurrency = require("./scraper");

//? get bi-directional exchange rates (usd <-> euro)
const arr = ["USD", "EURO"];

const getData = arr
  .map((base, _, arr) => {
    const otherCurrInArr = arr.filter((el) => el !== base);
    const getExchangePromises = otherCurrInArr.map((target) =>
      getCurrency({ base, target })
    );
    return getExchangePromises;
  })
  .reduce((result, nestedPromises) => [...result, ...nestedPromises], []);

Promise.all(getData)
  .then((result) => {
    console.log("result", result);
  })
  .catch((err) => {
    console.log("err.message", err.message);
    process.exit(0);
  });
