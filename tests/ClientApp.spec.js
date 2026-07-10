const {test, expect} = require('@playwright/test');

test('Client App Test' , async({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill('Diwakar0379@gmail.com');
    await page.fill('[type="password"]', 'Diwakar@123');
    await page.click('#login');
    const blink = page.locator('.blinkingText');
    console.log(await blink.textContent());
    
   const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await blink.click(),
   ]);

   console.log(await newPage.title());

   await newPage.close();
   await page.bringToFront();
   console.log(await page.title());

   //zara coat add to cart
   console.log(await page.locator('.card-body b').nth(1).textContent());
   await page.locator('button:has(.fa-shopping-cart)').nth(2).click();

   //go to cart and clik on puschase
   await page.locator('button:has(.fa-shopping-cart)').first().click();
   await page.getByText('Buy Now').click();
   await page.locator('[placeholder="Select Country"]').pressSequentially("Ind",{delay :150});
   const dropdown = page.locator('.ta-results');
   await dropdown.waitFor();
   const count = await dropdown.locator('button').count();

   for(let i = 0 ; i <count; i++){
    const option = dropdown.locator('button');
    if(await option.nth(i).textContent() === 'India'){
        await option.nth(i).click();
        break;
    }
   }
   await page.locator( '.actions a').click();

   //enter shippind details
   await page.pause();



   
})