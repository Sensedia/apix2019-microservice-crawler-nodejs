const puppeteer = require('puppeteer');

async function search(url, callback, gender, specification) {

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    page.on('request', request => request.continue());

    await page.setRequestInterception(true);
    await page.goto(url.getCompleteUrl(), { waitUntil: 'load' });

    const html = await page.content();

    browser.close();

    return callback(html, url, gender, Date.now(), specification);
}

module.exports = search;