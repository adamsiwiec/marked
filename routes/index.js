var express = require('express');
var path = require('path');
var fs = require('fs');
var toMarkdown = require('to-markdown');

var router = express.Router();
var markdown = require('markdown').markdown;

/* GET home page. */
router.get('/:name', (req, res) => {
  res.sendFile(path.join(__dirname, '/../index.html'));
});

router.get('/:name/data', (req, res) => {
    fs.readFile(path.join(__dirname, `/../data/${req.params.name}.html`), "utf-8", function read(err, data) {
        err ? res.json({"return": false}) : res.json({"return": true,"markdown": toMarkdown(data)});
})

})

router.post('/:name', (req, res) => {
    console.log(req.body)
    fs.writeFile(path.join(__dirname, `/../data/${ req.params.name }.html`), req.body.html , () => {
        res.send('Submitted');
    })


})

module.exports = router;
