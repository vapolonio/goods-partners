# Digital Goods

Solução desenvolvida durante o hackathon do Banco Original com o tema: desenvolver soluções consumindo as APIs do Open Bank Original e Machine Learning. A proposta visa incluir indivíduos que não possuem acesso a crédito a um modelo de crédito para gastos controlados, focado no consumo dos chamados "digital goods".

## Time:
- Alexsandro Cunha
- Felipe Fregulhia
- Lidia Grigorini
- Victor Apolonio
- Vinicius Min Soo
## Original Partner's
API e landing page para cadastro de parcerias.

## Original Good's
Aplicativo para acompanhamento do cartão e participação nas promoções cadastradas. [Videos de demonstração]( https://drive.google.com/file/d/1esLfBzurp15HTH6ZorqROOllQWt9gDxc/view)
### EndPoints  
Autenticação `/oauth`<br>
Recuperar saldo `/original/getBalance`<br>
Recuperar histórico de saldo `/original/getBalanceHistory`<br>
Recuperar histórico de transações `/original/getTransactionHistory`<br>
Recuperar lista de investimento `/original/getWalletv1`<br>
Enviar histórico de transações ao fireBase `/original/transaction`<br>
Chamada para predição do consumo `/model`

## Requerimentos

### Back-end
`npm install --save-dev babel-cli`<br>
`npm install --save-dev babel-preset-es2015 babel-preset-stage-2`<br>
`npm install`

### Modelo preditivo
`pip install -r path/to/requirements.txt`

