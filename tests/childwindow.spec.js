const { test, expect } = require('@playwright/test');


//open child window from pop up link 
test.only('@Child windows handel', async ({browser})=>
{
     const context = await browser.newContext();
     const page = await context.newPage();
     const userName = page.locator('#username');// username
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
// );
   const [newPage, newPage2] = await Promise.all ([

    context.waitForEvent('page'), // for knowlage of new page is open 
    documentLink.click() //just open in seprate tab/ window 
   ])

   const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@")
  const domain = arrayText[1].split(" ")[0];// split the domain name @is for split the domain name From text after @ the 0th index and space is fro brek the line
   console.log(domain);

// replace old email to new one which come from clild window
  await page.locator("#username").fill(domain);
  //await page.pause();
  console.log (await page.locator("#username").inputValue());

});