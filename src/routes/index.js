import express from 'express'


/* GET home page. */
let request = require('superagent');
let originalApi = require('../controller/originalApiController');
var router = express.Router();

const url = `http://localhost:3000/`;

let api_url = 'https://sandbox.original.com.br';
let auth_url = 'https://sb-autenticacao-api.original.com.br';
let auth_callback_url = `http://localhost:3000/callback`
let developer_key = '28f955c90b3a2940134ff1a970050f569a87facf';
let secret_key = 'dd385cd0b59c013560400050569a7fac';

router.get('/', function(req, res, next) {
    //res.status(200).json({ data: 'Hello World' });
    res.render('./../public/index.html');
});

router.get('/favicon.ico', function(req, res) {
    res.status(204);
});

router.get('/oauth', (req, res) => {
    let url = `${auth_url}/OriginalConnect?scopes=account&callback_url=${auth_callback_url}&callback_id=1&developer_key=${developer_key}`;
    res.redirect(url);
});

router.get('/callback', (req, res) => {
    request
        .post(`${auth_url}/OriginalConnect/AccessTokenController`)
        .set('Content-Type', 'application/json')
        .send({
            auth_code: req.query.auth_code,
            uid: req.query.uid,
            developer_key,
            secret_key
        })
        .end((err, response) => {

            originalApi.setAccessToken(response.body.access_token);
            console.log('TOKEN: ' + originalApi.getAccessToken());
            res.send('<script>window.close();</script>');
        });
}); 

router.get('/getCoin', (req, res) => {
    request
        .get('http://api.promasters.net.br/cotacao/v1/valores')
        .end((err, response) => {
            console.log(response.body);
            res.status(200).json(response.body);
        });
});

module.exports = router;