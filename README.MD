# Google search currencies scraper

Example of single one-way exchange-rate:

```javascript
const getCurrency = require("./scaper");

getCurrency({ base: "usd", target: "euro" }).then((result) => {
  console.log(result);
  // {
  //   base: "USD",
  //   target: "EURO",
  //   rate: 0.8928,
  //   date: "Jun 19, 11:06 UTC",
  // }
});
```

To get multiple bi-directional rates, look into `bi-directional.js`

- `npm run start` run code snippet above
- `npm run multi` run bi-directional rate binding
