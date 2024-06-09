const puppeteer = require('puppeteer');
const fs = require('fs');
const express=require("express");
const router=express.Router(); 

 async function generatePdf (url,resp) {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const website_url = url;

  await page.goto(website_url, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('screen');

  const pdf = await page.pdf({
    path: `result.pdf`,
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A2',
    landscape: true
  });

  await browser.close();
};

router.post('/pdf', (req, res) => {
  console.log(req.body.url)
  generatePdf(req.body.url,res).then(() =>{
    console.log(`Invoice PDF generated successfully at: result.pdf`);
    res.download("./result.pdf");
   })
  .catch((error) => {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
   });
})

module.exports=router

