import express from 'express'

let path = require('path');
let request = require('superagent');
let originalApi = require('../controller/originalApiController');
var router = express.Router();

const url = `http://localhost:3000/`;

let api_url = 'https://sandbox.original.com.br';
let auth_url = 'https://sb-autenticacao-api.original.com.br';
let auth_callback_url = `http://localhost:3000/callback`
let developer_key = '28f955c90b3a2940134ff1a970050f569a87facf';
let secret_key = 'dd385cd0b59c013560400050569a7fac';
let access_token = originalApi.getAccessToken();

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


router.get('/getHistory', (req, res) => {
    console.log('TOKEN:')
    console.log(originalApi.getAccessToken());
    console.log(access_token);
    execute_api('history');
});

module.exports = router;