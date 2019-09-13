/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	module.exports = {
		auth: {
			dev: {
				// url: 'mongodb://s_auth:s_auth@dbappdev.tap-agri.com:4848/s_auth?authSource=s_auth',
				url: 'mongodb://s_auth:4uth2019@dbappqa.tap-agri.com:4848/s_auth?authSource=s_auth',
				ssl: false
			},
			qa: {
				url: 'mongodb://s_auth:4uth2019@dbappqa.tap-agri.com:4848/s_auth?authSource=s_auth',
				ssl: false
			},
			prod: {
				url: 'mongodb://s_auth:4uth2019@dbapp.tap-agri.com:4848/s_auth?authSource=s_auth',
				ssl: false
			}
		},
		inspection: {
			dev: {
				// url: 'mongodb://s_inspeksi:s_inspeksi@dbappdev.tap-agri.com:4848/s_inspeksi?authSource=s_inspeksi',
				url: 'mongodb://s_inspeksi:1nsp3k5i2019@dbappqa.tap-agri.com:4848/s_inspeksi?authSource=s_inspeksi',
				ssl: false
			},
			qa: {
				url: 'mongodb://s_inspeksi:1nsp3k5i2019@dbappqa.tap-agri.com:4848/s_inspeksi?authSource=s_inspeksi',
				ssl: false
			},
			prod: {
				url: 'mongodb://s_inspeksi:1nsp3k5i2019@dbapp.tap-agri.com:4848/s_inspeksi?authSource=s_inspeksi',
				ssl: false
			}
		},
		reports: {
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
	}