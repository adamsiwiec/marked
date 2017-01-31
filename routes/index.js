var express = require('express');
var path = require('path');
var fs = require('fs');
var toMarkdown = require('to-markdown');

var router = express.Router();
var markdown = require('markdown').markdown;

router.use((req, res, next) => {
   if(req.url.substr(-1) == '/' && req.url.length > 1)
       res.redirect(301, req.url.slice(0, -1));
   else
       next();
});

/* GET home page. */
router.get('/:name/edit', (req, res) => {
  res.sendFile(path.join(__dirname, '/../index.html'));
});

router.get('/:name', (req, res) => {
  fs.readFile(path.join(__dirname, `/../data/${ req.params.name}.md`), (err, data) => {
    let stringData = data + "";

      fs.writeFile(path.join(__dirname, `/../data/temp/${ req.params.name}.html`),
          `<html lang="en">
            <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>${ req.params.name }</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" type="text/css" href="/css/norm.css" />
            <link rel="stylesheet" type="text/css" href="/css/markdown.min.css" />
        </head>
        <body>
        ${ markdown.toHTML(stringData)}
        </body>
        </html>
    `, (err) => {
        res.sendFile(path.join(__dirname, `/../data/temp/${ req.params.name}.html`))

})

})

})

router.get('/:name/edit/data', (req, res) => {
    fs.readFile(path.join(__dirname, `/../data/${req.params.name}.md`), "utf-8", function read(err, data) {
        if (err) {
            fs.writeFile(path.join(__dirname, `/../data/${req.params.name}.md`));

        } else {
              res.json({"return": true,"markdown": data});
          }
})

})

router.post('/:name/edit', (req, res) => {
    fs.writeFile(path.join(__dirname, `/../data/${ req.params.name }.md`), req.body.html , () => {
        res.send('Submitted');
    })


})

module.exports = router;
