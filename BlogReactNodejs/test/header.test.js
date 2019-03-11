const puppeteer = require('puppeteer');
let browser,page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-stable',
    headless: false
  });
  page = await browser.newPage();
  await page.goto('localhost:3000');
});

afterEach(async ()=>{
  await browser.close();
});

test('We can launch a browser', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);
  console.log(text);
  expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow',async()=>{
  await page.click('.right a');
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/);
})