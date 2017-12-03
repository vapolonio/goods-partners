import express from 'express'

let path = require('path');
let request = require('superagent');

const url = `http://localhost:3000/`;

let api_url = 'https://sandbox.original.com.br';
let auth_url = 'https://sb-autenticacao-api.original.com.br';
let auth_callback_url = `http://localhost:3000/callback`
let developer_key = '28f955c90b3a2940134ff1a970050f569a87facf';
let secret_key = 'dd385cd0b59c013560400050569a7fac';
let access_token = '';

let api = {};

api.setAccessToken = function(token){
    access_token = token;
} 

api.getAccessToken = function(){
    return access_token;
}


module.exports = api;