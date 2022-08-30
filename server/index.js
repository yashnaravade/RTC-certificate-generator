const {PDFDocument, StandardFonts, rgb} = require('pdf-lib');
const fs = require('fs');

async function createPdf(){


 const doc = await PDFDocument.create();
 
  const page = doc.addPage();

  page.drawText('Hello World!', {
    x: 20,
    y: 25,
    size: 30,
    color: rgb(0, 0, 0.5),  
    font: StandardFonts.TimesRoman

  });


  fs.writeFileSync('output.pdf', await doc.save());


}

createPdf();
