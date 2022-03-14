import puppeteer from 'puppeteer';

class VideoPlayer {
  playVideo(url) {
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

      await page.goto(url);

      await page.waitForSelector('.ytp-fullscreen-button.ytp-button');

      await page.evaluate(() => {
        document.querySelector('.ytp-fullscreen-button.ytp-button').click();
      });

      // close video player after video ends
      await page.waitForFunction(
        "document.querySelector('.ytp-time-current').innerHTML === document.querySelector('.ytp-time-duration').innerHTML"
      );
      await browser.close();
    } catch (err) {
      console.error(err);
    }
  }
}
