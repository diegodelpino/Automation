'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */
var Login = require('../page-objects/login.po.js');
var Menu = require('../page-objects/menu.po.js');
var SqlCommand = require('../page-objects/sqlCommand.po.js');
var gridTestUtils = require('../externalmodules/gridTestUtils.spec.js');
var randomstring = require("randomstring");

describe('INSIGHT Homepage - ', function () {
    var EC = protractor.ExpectedConditions;
    var login = new Login();
    var menu = new Menu();
    var sqlCommand = new SqlCommand();
    var sqlList = 'Default'
    var libraryTab = 'My Lists'
    var sqlName = 'Test ' + randomstring.generate(5);
    var sql = 'select * from batpod where pod_current =\'t\'';

    var newListName = 'Default'
    var newSqlName = 'Test ' + randomstring.generate(5);
    var newSql = 'select * from dual';

    console.log("The name of the query that will be used on this test is " + sqlName);
    login.accessLoginPage();

    beforeEach(function () {
        menu.accessSqlCommand();
    });

    it('should save a query on SQL Library', function () {
        sqlCommand.addSQLToLibrary(sqlName, sqlList, sql);
        expect(sqlCommand.sqlLibraryBtn.isDisplayed()).toBeTruthy();
        expect(sqlCommand.sqlLibraryBtn.isEnabled()).toBeTruthy();
        expect(sqlCommand.findSQLOnQueryList(sqlName, libraryTab, sqlList).isDisplayed()).toBeTruthy();
    });

    it('should load a saved query on SQL Library', function () {
        expect(sqlCommand.sqlLibraryBtn.isDisplayed()).toBeTruthy();
        expect(sqlCommand.sqlLibraryBtn.isEnabled()).toBeTruthy();
        sqlCommand.loadSQLFromLibrary(sqlName, libraryTab, sqlList);
        expect(sqlCommand.sqlInput.getText()).toEqual(sql);
    });

    it('should copy a saved Query', function () {
        var copylistName = 'Default'
        var copySqlName = 'This is a copy of ' + sqlName;
        var copySql = 'select * from dual';

        sqlCommand.copySQLOnLibraryView(sqlName, libraryTab, sqlList, copySqlName, copylistName, copySql);
        expect(sqlCommand.findSQLOnQueryList(copySqlName, libraryTab, copylistName).isDisplayed()).toBeTruthy();
        // expect(sqlCommand.findSQLOnQueryList(newSqlName, libraryTab, newListName).isDisplayed()).toBeFalsy();
    });

    it('Test EDITION', function () {
        sqlCommand.editSQLOnLibraryView(sqlName, libraryTab, sqlList, newSqlName, newListName, newSql);
        expect(sqlCommand.findSQLOnQueryList(newSqlName, libraryTab, newListName).isDisplayed()).toBeTruthy();
        //sqlCommand.loadSQLFromLibrary(newSqlName, libraryTab, newListName);
        //expect(sqlCommand.sqlInput.getText()).toEqual(newSql);
    });

    it('should delete a saved Query', function () {
        expect(sqlCommand.deleteSql(newSqlName, libraryTab, newListName).isDisplayed()).toBeFalsy();
  //      expect(sqlCommand.findSQLOnQueryList(newSqlName, libraryTab, newListName).isDisplayed()).toBeFalsy();
    });   

});
