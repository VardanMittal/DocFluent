// app creation for backend libraries
const express = require('express');
const ejs = require('ejs');

// text extraction and translation libraries 
const textExtract = require('pdf-text-extract');
const translate = require('translate-google');

// pdf creation libraries
const path = require('path');
const PDFDocument = require('pdfkit');
const fs = require("fs");



////////////////backend Logic///////////////////////////

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));




app.get("/", function (req, res) {
    res.render("home");
});

app.post("/inputLang", function (req, res) {
    let input = req.body.fromLanguage
    let translateTo = req.body.toLanguage
    console.log(input);
    let fileName = req.body.userfile
    var filePath = path.join(__dirname, fileName);
    textExtract(filePath, { encoding: "UTF8" }, function (err, pages) {
        if (err) {
            console.log(err)
        } else {
            pages.forEach(page => {
                translate(page, { from: input, to: translateTo }).then(transText => {
                    const doc = new PDFDocument();
                    doc.pipe(fs.createWriteStream("translated.pdf" +fileName));
                    doc
                        .fontSize(15)
                        .text(transText)
                    doc.end();
                }).catch(err => {
                    console.error(err)
                })
                console.log(pages);
            });
        }
    });
    res.redirect("/");
});
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is started on port 3000");
});