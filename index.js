const axios = require('axios');
const { exec } = require('child_process');

const SUCCESS_CMD = 'say "Gotti"';
const STORES = [
  4865,
  10568,
  10600,
  1805,
  4782,
  10601,
  4688,
  3110,
  4885,
  4205,
  7808,
  4196,
  10543,
];
const URL = 'https://www.riteaid.com/services/ext/v2/vaccine/checkSlots';

Promise.all(
  STORES.map(id => axios.get(`${URL}?storeNumber=${id}`))
).then((results) => {
  console.log('\n', new Date());

  const responses = results.map((response, idx) => Object.assign({}, response.data.Data, {storeId: STORES[idx]})).forEach(response => {
    console.log(response);
    if (response.slots && (response.slots['1'] || response.slots['2'])) {
      console.log('\nBINGO\n');
      exec(SUCCESS_CMD);
      console.log(response.storeId, response.slots['1'],response.slots['2']);
    }

  });
}).catch((err) => {
  console.log(err)
});
