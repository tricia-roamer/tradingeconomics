const te = require('tradingeconomics');
const camelCase = require('camelcase');

const transformVal = (val) => {
  if (val === null) { return undefined; }
  if (val instanceof Date) { return val.toISOString(); }
  return val;
};

const transformResponse = (obj) => {
  const output = {};
  Object.entries(obj).forEach(([key, val]) => {
    output[camelCase(key)] = transformVal(val);
  });
  return output;
};

module.exports = ({ apiKey }) => {
  te.login(apiKey);
  return {
    homepage: async (req, res) => {
      res.render('homepage', {});
    },
    news: async (req, res) => {
      const data = await te.getNews();

      const articles = data.reduce((acc, obj) => {
        if (!obj.id) { return acc; }
        return [...acc, obj];
      }, []);

      res.render('news', { articles });
    },
    calendar: async (req, res) => {
      const data = await te.getCalendar();

      const items = data.map((obj) => transformResponse(obj))
        .sort((a, b) => b.date - a.date);

      res.render('calendar', { items });
    },
  };
};
