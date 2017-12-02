import express from 'express'


/* GET home page. */
let request = require('superagent');
var router = express.Router();

const url = `http://localhost:3000/`;

let api_url = 'https://sandbox.original.com.br';
let auth_url = 'https://sb-autenticacao-api.original.com.br';
let auth_callback_url = `http://localhost:3000/callback`
let developer_key = '28f955c90b3a2940134ff1a970050f569a87facf';
let secret_key = 'dd385cd0b59c013560400050569a7fac';
let access_token = '';

router.get('/', function(req, res, next) {
    // res.status(200).json({ data: 'Hello World' });
    res.redirect('/oauth');
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

            access_token = response.body.access_token;

            execute_api('balance');
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

let resources = {
    balance: {
        method: 'get',
        path: '/accounts/v1/balance'
    },
    balance_history: {
        method: 'get',
        path: '/accounts/v1/balance-history?date_from=20170623'
    },
    history: {
        method: 'get',
        path: '/accounts/v1/transaction-history'
    }
}

let execute_api = name => {
    let resource = resources[name];
    
    let action =
        request
            [resource.method](`${api_url}${resource.path}`)
            .set('developer-key', developer_key)
            .set('Authorization', access_token);

    if ('headers' in resource)
        for (let key in resource.headers)
            action.set(key, resource.headers[key]);

    if ('data' in resource)
        action.send(resource.data);


    action.end((err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(res.body);

            if ('security_message' in res.body) {
                resources.tef_confirm.headers.security_response = res.body.security_message
            }
        }
    });
};

module.exports = router;
