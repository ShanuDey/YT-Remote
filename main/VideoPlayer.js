import puppeteer from 'puppeteer';
import path from 'path';

export default class VideoPlayer {
  constructor(browser) {
    this.browser = browser;
  }
  async playVideo(url) {
    const dataDir = path.resolve('dataDir');
    const extensionPath = path.resolve('extension', 'uBlock');
    this.browser = await puppeteer.launch({
      headless: false,
      userDataDir: dataDir,
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
      const [page] = await this.browser.pages();
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
    } catch (err) {
      console.error(err);
    }
  }
  async closePlayer() {
    await this.browser.close();
  }
}
