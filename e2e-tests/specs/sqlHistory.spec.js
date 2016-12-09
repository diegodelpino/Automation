'use strict';

var Login = require('../page-objects/login.po.js');
var SqlCommand = require('../page-objects/sqlCommand.po.js');
var Menu = require('../page-objects/menu.po.js');
var gridTestUtils = require('../externalmodules/gridTestUtils.spec.js');
var globals = require('../specs/globalVariables.js');


//Main test function
describe('[INSIGHT] - ', function () {
    var login = new Login();
    var menu = new Menu();
    var sqlCommand = new SqlCommand();

    login.accessLoginPage();
    menu.accessSqlCommand();


    it('Test the cache of SQLs on Sql History', function () {
        var expectedSqls = ['test 1'];

        menu.podSelect('NAS');
        sqlCommand.executeSql('NAS_DIT', expectedSqls[0]);
        sqlCommand.clearSqlInput();

        //var sqlHistory = sqlCommand.getSqlHistory();
        //console.log(sqlCommand.getSqlHistory().count());
        expect(sqlCommand.getSqlHistory().count()).toEqual("test 12");
        // sqlCommand.getSqlHistory().count()
        //     .then(function (count) {
        //         expect(count).toEqual("chupa");
        //         sqlCommand.closeSqlHistory();
        //     });

        expect(sqlCommand.getSqlHistoryElement(0).getText()).toEqual("chupa");
        // sqlCommand.getSqlHistory().count().then(function (count) {
        //     console.log(count);
        //     for (var i = 0; i < count; i++) {
        //         console.log("a " + i)

        //         expect(sqlCommand.getSqlHistoryElement(i).getText()).toEqual("chupa");
        //     }
        //     // sqlCommand.closeSqlHistory();
        // });
    });
});
