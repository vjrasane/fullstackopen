const puppeteer = require('puppeteer')

const main = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:3000')

  await page.click('.button.expand')
  await page.type('.input.username', 'ville')
  await page.type('.input.password', 'ville')
  await page.click('.button.login', { "waitUntil" : "networkidle0" })

  await page.screenshot({ path: 'kuva.png' })

  await browser.close()
}

main()
