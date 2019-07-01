/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	module.exports = {
		dev: {
			url: 'mongodb://s_report:s_report@dbappdev.tap-agri.com:4848/s_report?authSource=s_report',
			ssl: false
		},
		qa: {
			url: 'mongodb://s_report:s_report@dbappdev.tap-agri.com:4848/s_report?authSource=s_report',
			ssl: false
		},
		prod: {
			url: 'mongodb://s_report:r3p0rt2019@dbapp.tap-agri.com:4848/s_report?authSource=s_report',
			ssl: false
		}
	}