import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: null,
  ignoreDefaultArgs: [
    '--enable-automation',
    '--enable-blink-features=IdleDetection',
  ],
});

try {
  const [page] = await browser.pages();

  await page.goto('https://www.youtube.com/watch?v=-kjaV5fV9iw');

  await page.waitForSelector('.ytp-fullscreen-button.ytp-button');

  await page.evaluate(() => {
    document.querySelector('.ytp-fullscreen-button.ytp-button').click();
  });
} catch (err) {
  console.error(err);
}
