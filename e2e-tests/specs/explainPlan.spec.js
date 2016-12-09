'use strict';
var Login = require('../page-objects/login.po.js');
var Menu = require('../page-objects/menu.po.js');
var SqlCommand = require('../page-objects/sqlCommand.po.js');
var GridObjectTest = require('../externalmodules/gridObjectTestUtils.spec.js');
var gridTestUtils = require('../externalmodules/gridTestUtils.spec.js');
var EC = protractor.ExpectedConditions;

//Main test function
describe('INSIGHT Homepage - ', function () {
    var login = new Login();
    var menu = new Menu();
    var sqlCommand = new SqlCommand();

    login.accessLoginPage();
    menu.accessSqlCommand();

    it('should access the SQL Command screen and execute a query and then check if explain plan section has data inside', function () {
        var sql = 'select * from batpod where pod_current =\'t\'';
        menu.podSelect('MAS');
        sqlCommand.executeSql('WFN_DIT41', sql);
        browser.wait(EC.elementToBeClickable(sqlCommand.explainPlanBtn), 4000);
        sqlCommand.explainPlanBtn.click();
        browser.wait(EC.visibilityOf(sqlCommand.explainPlanResult), 4000);
        expect(sqlCommand.explainPlanResult.getText()).toContain('Operation');
        // gridTestUtils.expectCellValueMatch('sqlCommandGrid', 0, 0, 'WFN_DIT41');
    });
});
