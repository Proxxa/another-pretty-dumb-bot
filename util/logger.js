Moment = require('moment');
moment = new Moment();


function log(contents) {
    console.log(`${moment.format("MM-DD-YY")} [${moment.format('HH:MM:SS')}] LOG: ${contents}`);
}


function warn(contents) {
    console.log(`${moment.format("MM-DD-YY")} [${moment.format('HH:MM:SS')}] WARN: ${contents}`);
}


function error(contents) {
    console.log(`${moment.format("MM-DD-YY")} [${moment.format('HH:MM:SS')}] ERROR: ${contents}`);
}


exports.log = log;
exports.warn = warn;
exports.error = error;