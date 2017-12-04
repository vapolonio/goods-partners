import express from 'express'

var PythonShell = require('python-shell');
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
let access_token = '';

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
    },
    favored_accounts: {
        method: 'get',
        path: '/payments/v1/money-transfer/favored-accounts'
    },
    wallet_v1: {
        method: 'get',
        path: '/investments/v1/portfolio-summary'
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


router.get('/getTransactionHistory', (req, res) => {
    access_token = originalApi.getAccessToken();
    execute_api('history');
    res.end();
});

router.get('/getBalance', (req, res) => {
    access_token = originalApi.getAccessToken();
    execute_api('balance');
    res.end();
});

router.get('/getBalanceHistory', (req, res) => {
    access_token = originalApi.getAccessToken();
    execute_api('balance_history');
    res.end();
});

router.get('/getWalletv1', (req, res) => {
    access_token = originalApi.getAccessToken();
    execute_api('wallet_v1');
    res.end();
});

router.get('/prediction', (req, res) => {
    PythonShell('./../model/predict.py', options, function(err, results){
        console.log(results);
    });
    res.end();
});

router.get('/transaction', (req, res) => {
    request.put('https://post-database-br.firebaseio.com/transaction.json')
        .set('Content-Type', 'application/json')
        .send(`[
            {
                "transaction_amount": "202.50",
                "description": "TRANSFERENCIA ORIGINAL",
                "date": "20170601",
                "imputation_date": "20170601192548419",
                "transaction_type": "Débito",
                "comments": "Ag - 0001 Conta - 222222 - JANE DOE"
            },
            {
                "transaction_amount": "1100.00",
                "description": "TRANSFERENCIA ORIGINAL",
                "date": "20170601",
                "imputation_date": "20170601193427652",
                "transaction_type": "Débito",
                "comments": "Ag - 0001 Conta - 333331 - JACK DOE"
            },
            {
                "transaction_amount": "140.00",
                "description": "TRANSFERENCIA ORIGINAL",
                "date": "20170602",
                "imputation_date": "20170602145631212",
                "transaction_type": "Débito",
                "comments": "Ag - 0001 Conta - 222222 - JANE DOE"
            },
            {
                "transaction_amount": "500000.00",
                "description": "RESGATE FUNDO",
                "date": "20170727",
                "imputation_date": "20170727164845399",
                "transaction_type": "Crédito",
                "comments": "FOI RF CP"
            },
            {
                "transaction_amount": "15003.12",
                "description": "RESGATE FUNDO",
                "date": "20170727",
                "imputation_date": "20170727182213891",
                "transaction_type": "Crédito",
                "comments": "FOI RF CP"
            },
            {
                "transaction_amount": "70000.00",
                "description": "RESGATE FUNDO",
                "date": "20170801",
                "imputation_date": "20170801103639344",
                "transaction_type": "Crédito",
                "comments": "FOI RF CP"
            },
            {
                "transaction_amount": "200.00",
                "description": "CRED SALARIO PORTABILIDADE",
                "date": "20170803",
                "imputation_date": "20170803160740923",
                "transaction_type": "Crédito",
                "comments": ""
            },
            {
                "transaction_amount": "500.00",
                "description": "CH VLB DEVOLVIDO COMPE",
                "date": "20170803",
                "imputation_date": "20170803162021963",
                "transaction_type": "Crédito",
                "comments": ""
            },
            {
                "transaction_amount": "317.90",
                "description": "ACORDO CARTÃO CRED",
                "date": "20170803",
                "imputation_date": "20170803162055820",
                "transaction_type": "Débito",
                "comments": ""
            },
            {
                "transaction_amount": "200.00",
                "description": "TRANSFERENCIA ORIGINAL",
                "date": "20170808",
                "imputation_date": "20170808171016026",
                "transaction_type": "Débito",
                "comments": ""
            },
            {
                "transaction_amount": "100000.00",
                "description": "RESGATE FUNDO",
                "date": "20170818",
                "imputation_date": "20170818072915167",
                "transaction_type": "Crédito",
                "comments": "FOI RF CP"
            },
            {
                "transaction_amount": "10.00",
                "description": "TRANSFERENCIA ORIGINAL",
                "date": "20170824",
                "imputation_date": "20170824144627996",
                "transaction_type": "Débito",
                "comments": ""
            },
            {
                "transaction_amount": "10.00",
                "description": "TRANSFERENCIA ORIGINAL",
                "date": "20170825",
                "imputation_date": "20170825151812348",
                "transaction_type": "Débito",
                "comments": ""
            },
            {
                "transaction_amount": "10.00",
                "description": "TRANSFERENCIA ORIGINAL",
                "date": "20170825",
                "imputation_date": "20170825151851673",
                "transaction_type": "Débito",
                "comments": "Ag - 0001 Conta - Comentários  - TransSemPush"
            },
            {
                "transaction_amount": "5000.00",
                "description": "APLICAÇÃO FUNDO",
                "date": "20170828",
                "imputation_date": "20170828100052239",
                "transaction_type": "Débito",
                "comments": "BNP PARIBAS OPTIMUM"
            },
            {
                "transaction_amount": "5000.00",
                "description": "AJUSTE APLICAÇÃO",
                "date": "20170828",
                "imputation_date": "20170828100053193",
                "transaction_type": "Crédito",
                "comments": "BNP PARIBAS OPTIMUM"
            }
        ]`)
        .end(() => {
            console.log('done')
        });
})

module.exports = router;