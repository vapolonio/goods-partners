
# coding: utf-8

import pandas as pd
import numpy as np
from time import gmtime, strftime
import urllib2
import json
import requests
import matplotlib.pyplot as plt
from sklearn import linear_model
import json

API_TRANSACTIONS = "https://post-database-br.firebaseio.com/transaction.json"
API_STORE = "https://post-database-br.firebaseio.com/store.json"
API_PREDICT = "https://post-database-br.firebaseio.com/predict.json"


stores = pd.DataFrame({})
user = pd.DataFrame({})



responseTransactions = requests.get(API_TRANSACTIONS)
responseTransactions = responseTransactions.json()
transactions = pd.DataFrame(responseTransactions);
transactions[['date', 'transaction_amount']]
transactions['transaction_amount'] = pd.to_numeric(transactions['transaction_amount'])
transactions['transaction_amount'] = pd.to_numeric(transactions['transaction_amount'])
x = transactions['date'].loc[transactions['transaction_amount'] < 16000].reshape(-1, 1)
y = transactions['transaction_amount'].loc[transactions['transaction_amount'] < 16000]
regr = linear_model.LinearRegression()
regr.fit(x, y)
transactionPred = regr.predict(x)



date = list()
profile = list()
for i in x:
    date.append(i[0]) 
for i in transactionPred:
    profile.append(i) 
    
submission = {
    'dia': date, 
    'profile': profile
}

submission = json.dumps(submission)
type(submission)
submission


headers = {'Content-type': 'application/json'}
requests.post(API_PREDICT, json=submission, headers=headers)




