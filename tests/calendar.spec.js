const { test, expect } = require("@playwright/test");


test("Calendar Validation", async ({ page }) => {

    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year]
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    // Open calendar
    await page.locator(".react-date-picker__inputGroup").click();

    // Go to year selection
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    // Select year
    await page.getByText(year).click();

    // Select month (June = 5 index)
    await page.locator(".react-calendar__year-view__months__month")
        .nth(Number(monthNumber) - 1)
        .click();

    // Select date
    await page.locator("//abbr[text()='" + date + "']").click();

    // Assertion (Validation)
    const inputs = await page.locator('.react-date-picker__inputGroup input');
    for (let i = 0; i< expectedList.length; i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }

});




// const {test,expect} = require("@playwright/test");
 
 
// test("Calendar validations",async({page})=>
// // {
 
//     const monthNumber = "6";
//     const date = "15";
//     const year = "2027";
//     const expectedList = [monthNumber,date,year];
    
//     await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
//     await page.locator(".react-date-picker__inputGroup").click();
//     await page.locator(".react-calendar__navigation__label").click();
//     await page.locator(".react-calendar__navigation__label").click();
//     await page.getByText(year).click();
//     await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
//     await page.locator("//abbr[text()='"+date+"']").click();
 
//     const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
//     for(let i =0; i<expectedList.length;i++)
//     {
//         const value = await inputs.nth(i).inputValue();
//         expect(value).toEqual(expectedList[i]);
 
//     }
 
   
 
 
 
 
 
 
 
 
 
 
 
 
 
// })


