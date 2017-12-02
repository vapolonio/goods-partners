import express from 'express'
import { listCoins } from '../controller/coinController'
let router = express.Router();
import request from 'request';
const api = 'http://api.promasters.net.br/cotacao/v1/valores';

/**
 * List all supported coins
 * @api /coins
 */
router.get('/', (req, res) => {
    request(api, function(error, response, body){
        res.status(200).json(JSON.parse(response.body));
    });
});

module.exports = router;