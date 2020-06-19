const puppeteer = require("puppeteer");

const launchOptions = { headless: true };
const timeout = 5 * 1000;

const getGoogleSearchUrl = (base, target) => {
  return `https://www.google.com/search?hl=en&q=${base}+to+${target}`;
};

async function scrapGoogle({ base, target }) {
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  await page.goto(getGoogleSearchUrl(base, target));

  await page.waitForSelector("#knowledge-currency__updatable-data-column", {
    timeout,
  });

  const { rate, date } = await page.evaluate(() => {
    return {
      rate: parseFloat(
        document
          .querySelector('div[data-exchange-rate]:not([data-exchange-rate=""])')
          .getAttribute("data-exchange-rate")
      ),
      date:
        document
          .getElementById("knowledge-currency__updatable-data-column")
          .querySelectorAll("div")[3]
          .childNodes[0].textContent.split("UTC")[0] + "UTC",
    };
  });

  await browser.close();

  if (Number.isNaN(rate)) {
    throw new Error("Error getting exchange value. Number is NaN.");
  }

  return {
    base: base.toUpperCase(),
    target: target.toUpperCase(),
    rate,
    date,
  };
}

module.exports = scrapGoogle;
