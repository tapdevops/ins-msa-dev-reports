/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	module.exports = {
		dev: {
			url: 'mongodb://s_report:s_report@dbappdev.tap-agri.com:4848/s_report?authSource=s_report',
			ssl: false,
			oracle: {
				user          : process.env.NODE_ORACLEDB_USER || "mobile_inspection",
				password      : process.env.NODE_ORACLEDB_PASSWORD || "mobile_inspection",
				connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "10.20.1.111:1521/tapapps"
			}
		},
		qa: {
			url: 'mongodb://s_report:r3p0rt2019@dbappqa.tap-agri.com:4848/s_report?authSource=s_report',
			ssl: false
		},
		prod: {
			url: 'mongodb://s_report:r3p0rt2019@dbapp.tap-agri.com:4848/s_report?authSource=s_report',
			ssl: false,
			oracle: {
				user          : process.env.NODE_ORACLEDB_USER || "mobile_inspection",
				password      : process.env.NODE_ORACLEDB_PASSWORD || "mobile_inspection",
				connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "10.20.1.207:1521/tapapps"
			}
		}
	}
