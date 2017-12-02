import express from 'express'


/* GET home page. */
var router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).json({ data: 'Hello World' });
});

router.get('/favicon.ico', function(req, res) {
    res.status(204);
});

module.exports = router;
