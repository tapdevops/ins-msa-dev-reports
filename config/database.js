/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	module.exports = {
		production: {
			url: 'mongodb://s_report:r3p0rt2019@dbapp.tap-agri.com:4848/s_report?authSource=s_report',
			ssl: false
		},
		development: {
			url: 'mongodb://s_report:s_report@dbappdev.tap-agri.com:4848/s_report?authSource=s_report',
			ssl: false
		}
	}