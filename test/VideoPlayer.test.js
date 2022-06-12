const puppeteer = require("puppeteer");

let browser;
beforeEach(async() => {
    browser = await puppeteer.launch({headless: false});
});
  
afterEach(async() => {
    await browser.close();
});

test("I check client UI is loading", async () => {
    const page = await browser.newPage();
    await page.goto("http://localhost:80");
    let pageHeader = await page.$(".navbar-brand");
    let pageHeaderValue = await pageHeader.evaluate((el) => el.textContent);
    expect(pageHeaderValue).toContain("YT Remote");
}, 120000);

test("I check video search is working", async () => {
    const page = await browser.newPage();
    await page.goto("http://localhost:80");
    await page.type('input[name="search_keyword"]', 'Tom & Jerry', {delay: 20})
    await page.click('.btn-outline-success.btn-sm');
    const [element] = await page.$x("/html/body/div[@class='container']/main/div[@class='container']/div[2]/div[1]/div[@class='card']/div[@class='card-body']/h5[@class='card-title']");
    const text = await page.evaluate((el) => el.innerText, element);
    expect(text).toContain('Tom & Jerry');
}, 120000);
