/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	module.exports = {
		/*production: {
			url: 'mongodb://dbapp:dbapp123@dbapp.tap-agri.com:27017/s_report?authSource=admin',
			ssl: false
		},*/
		development: {
			url: 'mongodb://s_report:s_report@dbappdev.tap-agri.com:4848/s_report?authSource=s_report',
			ssl: false
		}
	}