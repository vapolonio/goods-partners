import express from 'express'

let path = require('path');
let request = require('superagent');

let access_token = '';

let api = {};

api.setAccessToken = function(token){
    access_token = token;
} 

api.getAccessToken = function(){
    return access_token;
}


module.exports = api;