// app creation for backend libraries
const express = require('express');
const ejs = require('ejs');

// text extraction and translation libraries 
const textExtract = require('pdf-text-extract');
const translate = require('translate-google');

// pdf creation libraries
const path = require('path');
const PDFDocument = require('pdfkit');



////////////////backend Logic///////////////////////////

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const doc = new PDFDocument();

app.route("/")
    .get(function (res, req) {
        var filePath = path.join(__dirname, 'telugu doc.pdf');
        textExtract(filePath, { encoding: "UTF8" }, function (err, pages) {
            if (err) {
                console.log(err)
            } else {
                pages.forEach(page => {
                   translate(page, { to: 'en'}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.error(err)
                }) 
                });
            }
        });

    })

app.listen(3000, function () {
    console.log("server starts at 3000 successfully!!");
})