// bring puppeteer module as middleware
const puppeteer = require('puppeteer');

// Smoke test example
describe('Smoke Test', () => {
    // TC-XXX
    it('should load website', async function() {
        // create a browser instance
        let browser = await puppeteer.launch({ headless: true });

        // create a page instance from browser instance
        let page = await browser.newPage();

        // set default timeout with 10s
        await page.setDefaultTimeout(10000);

        // visit to zero bank page
        await page.goto('https://devexpress.github.io/testcafe/example/');

        // wait for DOM displayed/rendered
        await page.waitForSelector('#main-form');

        // close browser instance
        await browser.close();
    });
});