const { DateTime } = require('luxon');

const { SITE_NAME, APP_TIMEZONE } = process.env;

const { nsp } = require('../lib/express/namespace');

exports.siteName = SITE_NAME || '';

exports.nsp = nsp;

exports.dateRelative = (d) => DateTime.fromJSDate(new Date(d)).setZone(APP_TIMEZONE).toRelative();
exports.dateFormat = (d) => DateTime.fromJSDate(new Date(d)).setZone(APP_TIMEZONE).toFormat('dd LLLL T');
