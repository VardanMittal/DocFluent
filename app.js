const translate = require('translate-google')
const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// const tranObj = {
//     a: 1,
//     b: '1',
//     c: "वर्धन कसा आहे",
//     d:"ਚੁੰਤੀਆ ਸਾਮਲਾ"
// }

app.route("/")
    .get(function (res, req) {
        translate("ਤੈਨੂੰ", { to: 'en', except: ['a'] }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
        })

app.listen(3000, function(){
    console.log("Server started");
})
