Moment = require('moment');
chalk = require('chalk');
moment = new Moment();


function log(contents) {
    console.log(`${moment.format("MM-DD-YY")} [${moment.format('HH:MM:SS')}] ${chalk.bgWhite.black("LOG:")} ${contents}`);
}


function warn(contents) {
    console.log(`${moment.format("MM-DD-YY")} [${moment.format('HH:MM:SS')}] ${chalk.bgYellow.black("WARN:")} ${contents}`);
}


function error(contents) {
    console.log(`${moment.format("MM-DD-YY")} [${moment.format('HH:MM:SS')}] ${chalk.bgRed.black("ERROR:")} ${contents}`);
}


exports.log = log;
exports.warn = warn;
exports.error = error;