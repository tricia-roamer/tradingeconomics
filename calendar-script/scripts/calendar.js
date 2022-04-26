const inquirer = require('inquirer');
const moment = require('moment-timezone');

const getCalendar = require('./http/getCalendar.js');

function CalendarEvent ({
  Country, Event, FormattedDate, Actual, Previous, Forecast,
}) {
  this.Country = Country;
  this.Event = Event;
  this.Date = FormattedDate;
  this.Actual = Actual;
  this.Previous = Previous;
  this.Forecast = Forecast;
}

// get a list of all timezones
const timeZoneChoices = () => {
  const timezones = moment.tz.names();
  return timezones.map((str) => ({ key: 'timezone', name: str, value: str }))
}

// Create a list op questions
(async () => {
  const questions = [
    {
      type: 'list',
      name: 'timezone',
      message: 'Choose timezone.',
      choices: timeZoneChoices(),
    },
    {
      type: 'list',
      name: 'importance',
      message: 'Which star rating would you like to view?',
      choices: [
        {
          key: 'one',
          name: 'One star',
          value: '1', 
        },
        {
          key: 'two',
          name: 'Two star',
          value: '2',
        },
        {
          key: 'three',
          name: 'Three star',
          value: '3',
        },
      ],
    },
  ];

  inquirer.prompt(questions).then(async (answers) => {
    // retrieve calendar data from tradingeconomics
    const data = await getCalendar(answers);

    console.log(data);

    // add event data to array
    const tableData = data.reduce((acc, obj) => {
      if (obj.Category === 'Calendar') { return acc; }

      // string interpolation needed to format timezone correctly
      const FormattedDate = moment(`${obj.Date}Z`).tz(answers.timezone).format('YYYY-MM-DD LT');
      
      return [...acc, new CalendarEvent({ FormattedDate, ...obj })];
    }, []);

    // output data
    console.table(tableData);

    process.exit();
  });
})();
