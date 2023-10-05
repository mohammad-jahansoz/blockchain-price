first should npm install

query CryptoQuery{
lastPrice(dbNumber:1){
time,
rate
}
}

mutation AddMutation($second :Float!){
  createCronJob(second:$second)
}
