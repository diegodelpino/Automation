'use strict';
var Login = require('../page-objects/login.po.js');
var Menu = require('../page-objects/menu.po.js');
var SqlCommand = require('../page-objects/sqlCommand.po.js');

describe('INSIGHT Homepage - ', function () {
    var login = new Login();
    var menu = new Menu();
    var sqlCommand = new SqlCommand();

    login.accessLoginPage();
    beforeEach(function () {
        menu.accessSqlCommand();
    });

    //each 'it' is a test
    it('performs selection among all Pod Groups, including selection of all Pods belonging to a Pod Group', function () {
        element(by.cssContainingText('option', 'NAS')).click();
        var expectedPods = ['NAS_DIT'];
        var els = element.all(by.repeater('pod in pods'));
        for (var i = 0; i < expectedPods.length; ++i) {
            expect(els.get(i).getText()).toEqual(expectedPods[i]);
        }

        element(by.cssContainingText('option', 'MAS')).click();
        var expectedPods = ['WFN_DIT41', 'WFN_DIT4'];
        var els = element.all(by.repeater('pod in pods'));
        for (var i = 0; i < expectedPods.length; ++i) {
            expect(els.get(i).getText()).toEqual(expectedPods[i]);
        }

        element(by.cssContainingText('option', 'CATALOG')).click();
        var expectedPods = ['R1304', 'R1301'];
        var els = element.all(by.repeater('pod in pods'));
        for (var i = 0; i < expectedPods.length; ++i) {
            expect(els.get(i).getText()).toEqual(expectedPods[i]);
        }

        element(by.cssContainingText('option', 'ANALITICS')).click();
        var expectedPods = ['ADPA_FIT'];
        var els = element.all(by.repeater('pod in pods'));
        for (var i = 0; i < expectedPods.length; ++i) {
            expect(els.get(i).getText()).toEqual(expectedPods[i]);
        }

    });

});