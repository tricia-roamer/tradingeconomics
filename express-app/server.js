if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); } // eslint-disable-line global-require
process.env.TZ = 'UCT';

const {
  APP_PORT,
} = process.env;

// Web app
const app = require('./app');

app.set('port', APP_PORT || 8080);

const server = app.listen(app.get('port'), () => {
  console.log(`Web running on → http://localhost:${server.address().port}`);
});
