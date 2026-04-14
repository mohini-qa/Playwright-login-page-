//
const { test, expect } = require('@playwright/test');

test('@wc client app login', async ({page}) => {
     
 
    const email = "anshika@gmail.com";// this is added for email bar from payment mode
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");// all the product present in the page and add for add to cart 
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    
    // await page.locator(".card-body b").last().waitFor();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();//we are wating to load the data at least one card body 
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();
    for(let i= 0; i < count; i++)
    {
      if(await products.nth(i).locator("b").textContent() === productName)
    

    
    {
      // add iteam to card
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
    await page.locator("[routerlink*='cart']").click();// cart css 
    await page.locator("div li").first().waitFor(); // to check the no. of product present in the cart page
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();//locator with text
    expect(bool).toBeTruthy();

    //checkout button
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");// pressSequentially=typing and search
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    // select India from dropdown
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i< optionsCount; ++i)
    {
      const text = await dropdown.locator("button").nth(i).textContent();
      if(text === " India")
      {
        await dropdown.locator("button").nth(i).textContent();
        break;

      }
    }
   //await page.pause();

   // email id from payment mode
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit ").click();

    // landed on the thankyou page
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");//class=.hero-primary
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
 
    // clicking on order tab from header to check order details 
    await page.locator("button[routerlink*='myorder']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");//select all the order from order list for that search tbody and for perticular row add tbody th
   
    for(let i = 0; i < await rows.count(); ++i)
    {
      const rowOrderId = await rows.nth(i).locator("th").textContent();

      if(orderId.includes(rowOrderId))
        
      {
      await rowOrderId.nth(i).locator("button").first().click();
      break;
      }

    }
     const orderDetails = await page.locator(".col-text").textContent();
     expect(orderId.includes(orderDetails)).toBeTruthy();

  });   


