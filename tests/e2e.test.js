// bring puppeteer module as middleware
const puppeteer = require('puppeteer');

// E2E test suit example
describe('End to End Test', () => {
    let browser;
    let page;

    // works before run test steps
    before(async function () {
        // create a browser instance
        browser = await puppeteer.launch({ headless: true });

        // create a page instance from browser instance
        page = await browser.newPage();

        // set default timeout with 10s
        await page.setDefaultTimeout(10000);
    });

    // works after run test steps done
    after(async function () {
        // close browser instance
        await browser.close();
    });

    // TC-XXX
    it('should submit form', async function () {
        // visit to zero bank page
        await page.goto('https://devexpress.github.io/testcafe/example/');

        // wait for DOM displayed/rendered
        await page.waitForSelector('#main-form');

        // input name
        await page.type('#developer-name', 'HP');

        // click on checkbox
        await page.click('#tried-test-cafe');

        // click on submit button
        await page.click('#submit-button');

        // check result after dom displayed / rendered
        await page.waitForSelector('.result-content');
    });

    // TC-XXX
    it('should select value from the select box', async function() {
        // visit to zero bank page
        await page.goto('https://devexpress.github.io/testcafe/example/');

        // wait for DOM displayed/rendered
        await page.waitForSelector('#main-form');

        // select select box
        await page.select('#preferred-interface', 'Javascript API');
    });
});