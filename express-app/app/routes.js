const express = require('express');

const { API_KEY } = process.env;

const { catchErrors } = require('./handlers/errorHandlers');
const newsPageController = require('./controllers/contentController')({ apiKey: API_KEY });

const router = express.Router();

router.get('/', catchErrors(newsPageController.homepage));
router.get('/news', catchErrors(newsPageController.news));
router.get('/calendar', catchErrors(newsPageController.calendar));

module.exports = router;
