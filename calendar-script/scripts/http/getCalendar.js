const got = require('got');

module.exports = ({ importance }) => {  
  const uri = `https://api.tradingeconomics.com/calendar?importance=${importance}&c=guest:guest&f=json`;

  const options = {
    responseType: 'json',
  };

  return got.get(uri, options)
    .then((res) => res.body)
    .catch((err) => err?.response?.body || err.message);
};
