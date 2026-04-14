//
const { test, expect } = require('@playwright/test');

test('browser context-Validating Error login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');// username
    const signIn = page.locator('#signInBtn');// button 
    const cardTitles = page.locator(".card-body a");//image name or title

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();

    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    console.log(await cardTitles.first().textContent());// for showing first product 
    console.log(await cardTitles.nth(1).textContent());// no. of product

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});

// UI means like radio button /check uncheck box
test('UI Controls' , async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');// username
    const signIn = page.locator('#signInBtn');// button 
    const documentLink = page.locator("[href*='documents-request]");
    const dropdown = page.locator("select.form-control");// for select dropdown
    await dropdown.selectOption("consult");
    await page.pause();// waiting till execution 

    //select radio button
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    
    console.log(await page.locator(".radiotextsty").last().isChecked());
    expect(page.locator(".radiotextsty").last()).toBeChecked();
      
    // check & uncheck box
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator ("#terms").isChecked()).toBeFalsy();
    
    await expect(documentLink).toHaveAttribute("class","blinkingText");

});

//open child window from pop up link 
test('@Child windows handel', async ({browser})=>
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



// Zara coat