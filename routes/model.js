import express from 'express'

let path = require('path');
let request = require('superagent');
import { runModel } from '../controller/runClassifier';
var router = express.Router();

router.get('/', (req, res) => {
    console.log('pre-model');
    runModel();
    res.status(200).json('running predict');

});

module.exports = router;
