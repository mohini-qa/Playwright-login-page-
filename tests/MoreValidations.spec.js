const { test, expect } = require("@playwright/test")


test("Popup validation", async( {page} )=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goFarward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // await page.pause();
    
    //HANDLE POPup
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    
//hover on maouse to element
    await page.locator("#mousehover").hover();

//how to handle frames
    const framesPage = page.frameLocator("#courses-iframe");    
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    //await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
    await page.pause();



});