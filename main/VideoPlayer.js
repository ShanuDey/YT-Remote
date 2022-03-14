import puppeteer from 'puppeteer';
import path from 'path';

export default class VideoPlayer {
  async playVideo(url) {
    const extensionPath = path.join(__dirname, 'extension', 'uBlock');
    console.log(ext);
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: '/usr/bin/chromium-browser',
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
      defaultViewport: null,
      ignoreDefaultArgs: [
        '--enable-automation',
        '--enable-blink-features=IdleDetection',
      ],
    });

    try {
      const [page] = await browser.pages();
      page.setDefaultNavigationTimeout(0);
      await page.goto(url);
      await page.waitForSelector('.ytp-fullscreen-button.ytp-button');
      await page.evaluate(() => {
        document.querySelector('.ytp-fullscreen-button.ytp-button').click();
      });

      // close video player after video ends
      //await page.waitForFunction(
      // "document.querySelector('.ytp-time-current').innerHTML === document.querySelector('.ytp-time-duration').innerHTML"
      //);
      //await browser.close();
    } catch (err) {
      console.error(err);
    }
  }
}
