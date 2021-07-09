
const rTracer = require('cls-rtracer')

var log4js = require('log4js');

log4js.configure({
  pm2: true,
  appenders: {
    portal_api: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: process.env.LOGGER_FORMAT || '%x{timestamp} %c [%p] [sid:%x{sid}] [ref:%x{ref}] - %m',
        tokens: {

          sid: function(logEvent) {

            let sid_ref = rTracer.id();

            if (sid_ref && sid_ref.split('-').length == 2) {

              return sid_ref.split('-')[0];
            }

            return '-';
          },

          ref: function(logEvent) {

            let sid_ref = rTracer.id();

            if (sid_ref && sid_ref.split('-').length == 2) {

              return sid_ref.split('-')[1];
            }

            return '-';
          },

          timestamp: function(logEvent) {
            return Date.now();
          }
        }
      }
    },

    appfile: { type: "file", filename: "cheese.log" } },
  categories: { default: { appenders: ["portal_api"], level: process.env.APPLOGLEVEL || "debug" } }
});


var logger = log4js.getLogger('[portal-api]');

module.exports = logger;

module.exports.getLogger = (name) => {

  return {
    info: (arguments)    => logger.info   (`[${name}]`,arguments) ,
    warning: (arguments) => logger.warning(`[${name}]`,arguments) ,
    debug: (arguments)   => logger.debug  (`[${name}]`,arguments) ,
    error: (arguments)   => logger.error  (`[${name}]`,arguments) ,
    trace: (arguments)   => logger.trace  (`[${name}]`,arguments) ,
  }
} // module.exports
