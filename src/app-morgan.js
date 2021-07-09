
const rTracer = require('cls-rtracer')

const morgan  = require('morgan');

morgan.token('sid', function (req, res) {

  let sid_ref = rTracer.id();

  if (sid_ref && sid_ref.split('-').length == 2) {

    return sid_ref.split('-')[0];
  }

  return null;
})

morgan.token('ref', function (req, res) {

  let sid_ref = rTracer.id();

  if (sid_ref && sid_ref.split('-').length == 2) {

    return sid_ref.split('-')[1];
  }

  return null;
})

morgan.token('timestamp', function (req, res) { return Date.now() })

// tokens from express-useragent
morgan.token('devicetype', function (req, res) { return req.device.type })

morgan.token('os', function (req, res) { return req.useragent.os })

morgan.token('browser', function (req, res) { return req.useragent.browser })

morgan.token('browserVersion', function (req, res) { return req.useragent.version })

morgan.token('action', function (req, res) { 

	action = req.path.split('/')[1];
	
	return action ? action : 'api';
});

morgan.token('statusname', function (req, res) {
	switch(res.statusCode) {
		case 200:
			return 'SUCCESS';
		case 201:
			return 'CREATED';
		default:
			return 'FAILED';
	}
})

//This tells express to log via morgan
//and morgan to log in the "combined" pre-defined format
const appmorgan = morgan(
  process.env.ACCESS_LOG_FORMAT || ':timestamp [portal-api] [ACCESS] [sid::sid] [ref::ref] - [:method :url HTTP/:http-version] [:remote-addr] [:devicetype] [:os] [:browser] [:browserVersion] [:action] [:statusname] - :status :response-time ms :res[content-length]'
);

module.exports = appmorgan;

/*

from express-useragent

	{
		isYaBrowser: false,
		isAuthoritative: true,
		isMobile: false,
		isMobileNative: false,
		isTablet: false,
		isiPad: false,
		isiPod: false,
		isiPhone: false,
		isiPhoneNative: false,
		isAndroid: false,
		isAndroidNative: false,
		isBlackberry: false,
		isOpera: false,
		isIE: false,
		isEdge: false,
		isIECompatibilityMode: false,
		isSafari: false,
		isFirefox: false,
		isWebkit: false,
		isChrome: true,
		isKonqueror: false,
		isOmniWeb: false,
		isSeaMonkey: false,
		isFlock: false,
		isAmaya: false,
		isPhantomJS: false,
		isEpiphany: false,
		isDesktop: true,
		isWindows: true,
		isLinux: false,
		isLinux64: false,
		isMac: false,
		isChromeOS: false,
		isBada: false,
		isSamsung: false,
		isRaspberry: false,
		isBot: false,
		isCurl: false,
		isAndroidTablet: false,
		isWinJs: false,
		isKindleFire: false,
		isSilk: false,
		isCaptive: false,
		isSmartTV: false,
		isUC: false,
		isFacebook: false,
		isAlamoFire: false,
		isElectron: false,
		silkAccelerated: false,
		browser: 'Chrome',
		version: '90.0.4430.212',
		os: 'Windows 10.0',
		platform: 'Microsoft Windows',
		geoIp: {},
		source: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
		isWechat: false
	}

*/
