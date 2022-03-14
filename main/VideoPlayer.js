import puppeteer from 'puppeteer';
import path from 'path';

export default class VideoPlayer {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async openPlayer() {
    const dataDir = path.resolve('dataDir');
    this.browser = await puppeteer.launch({
      headless: false,
      userDataDir: dataDir,
      defaultViewport: null,
      ignoreDefaultArgs: [
        '--enable-automation',
        '--enable-blink-features=IdleDetection',
      ],
    });
    const [page] = await this.browser.pages();
    this.page = page;
    this.page.setDefaultNavigationTimeout(0);
  }

  async playVideo(url) {
    try {
      if (typeof this.page === 'undefined' || this.page === null) {
        await this.openPlayer();
      }
      await this.page.goto(url);
      await this.page.waitForSelector('.ytp-fullscreen-button.ytp-button');
      await this.page.evaluate(() => {
        document.querySelector('.ytp-fullscreen-button.ytp-button').click();
      });
    } catch (err) {
      console.error(err);
    }
  }

  async closeVideo() {
    if (this.page) await this.browser.close();
    this.page = null;
    this.browser = null;
  }
}
