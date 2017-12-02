import express from 'express'
import { listCoins, registerCoin } from '../controller/coinController'
// , registerCoin
let router = express.Router();

/**
 * List all supported coins
 * @api /coins
 */
router.get('/', (req, response, next) => {
    listCoins()
        .subscribe( (result) => {
            response.status(200).json(result);
        }, (error) => {
            console.error(error);
            response.status(400).json(error);
        }
    )
})
router.post('/', (req, response, next) => {
    registerCoin()
        .subscribe(() => {
            response.status(200).json("Dado salvo");
        }, (error) => {
            console.log(error)
            response.status(400).json("error");
        })
})

module.exports = router;