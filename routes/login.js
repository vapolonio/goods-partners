import express from 'express'

let router = express.Router();
let request = require('superagent');

const url = `http://localhost:3000/`;

let api_url = 'https://sandbox.original.com.br';
let auth_url = 'https://sb-autenticacao-api.original.com.br';
let auth_callback_url = `http://localhost:3000/callback`
let developer_key = '28f955c90b3a2940134ff1a970050f569a87facf';
let secret_key = 'dd385cd0b59c013560400050569a7fac';
let access_token = '';


router.get('/oauth', (req, res) => {
    let url = `${auth_url}/OriginalConnect?scopes=account&callback_url=${auth_callback_url}&callback_id=1&developer_key=${developer_key}`;
    res.redirect(url);
});


router.get('/callback', (req, res) => {
    show(
        'Callback oauth received',
        req.query,
        'Requesting access token'
    );

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
            show(
                'Response', response.statusMessage, response.statusCode,
                'Headers', response.headers,
                'Content', response.text
            );

            access_token = response.body.access_token;

            res.send('<script>window.close();</script>');
        });
});

module.exports = router;