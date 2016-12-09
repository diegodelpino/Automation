'use strict';

var Login = require('../page-objects/login.po.js');
var SqlCommand = require('../page-objects/sqlCommand.po.js');
var Menu = require('../page-objects/menu.po.js');
var gridTestUtils = require('../externalmodules/gridTestUtils.spec.js');

//Main test function
describe('INSIGHT Homepage - ', function () {
    var login = new Login();
    var menu = new Menu();
    var sqlCommand = new SqlCommand();

    login.accessLoginPage();
    menu.accessSqlCommand();
    

    it('should access the SQL Command screen and execute a query', function () {
        var sql = 'select * from batpod where pod_current =\'t\'';
        menu.podSelect('NAS');
        sqlCommand.executeSql('NAS_DIT', sql);
        gridTestUtils.expectCellValueMatch('sqlCommandGrid', 0, 0, 'NAS_DIT');
    });
});
