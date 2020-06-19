const getCurrency = require("./scraper");

// ? get single exchange rate

getCurrency({ base: "usd", target: "euro" })
  .then((result) => {
    console.log("result", result);
  })
  .catch((err) => {
    console.log("err.message", err.message);
    process.exit(0);
  });
