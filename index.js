const { error } = require("console");
const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://thepastaqueen.cooking/blogs/recipes/the-best-authentic-italian-minestrone-recipe"
  );
  //   await page.screenshot({ path: "example.png" });
  //1
  //   const title = await page.evaluate(() => document.title);
  //   console.log(title);
  const recipe = await page.evaluate(() =>
    Array.from(document.querySelectorAll("body"), (e) => ({
      title: e.querySelector(".article-template__title").innerText,
      direction: e.querySelector(".recipe-method ol").innerText,
      description: e.querySelector(".article-template__content").innerText,
      ingredients: e.querySelector(".recipe-ingredients ul").innerText,
    }))
  );
  console.log(recipe);
  // save data to JSON file
  fs.writeFile("courses.json", JSON.stringify(recipe), (error) => {
    if (error) throw error;
    console.log("file saved");
  });
  const links = await browser.close();
}

run();
