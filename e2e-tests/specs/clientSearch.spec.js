'use strict';

var Login = require('../page-objects/login.po.js');
var Menu = require('../page-objects/menu.po.js');

//Main test function
describe('INSIGHT Homepage - ', function () {
    var login = new Login();
    var menu = new Menu();

    login.accessLoginPage();
    beforeEach(function () {
        menu.accessSqlCommand();
    });

    it('performs a client search for ADP2 on NAS database', function () {
        menu.podSelect('NAS');
        menu.clientSearch('ADP2');

        //Test each result presented by popover
        expect(element(by.id('clientCode')).getInnerHtml()).toBe('ADP2');
        expect(element(by.id('clientOID')).getInnerHtml()).toBe(' G35ZRXDW3030001D');
        expect(element(by.id('podCode')).getInnerHtml()).toBe(' NAS_DIT');

        //iterates over the list of products
        var expectedProducts = ['HRII 153'];
        var els = element.all(by.repeater('product in selectedClient.products'));
        for (var i = 0; i < expectedProducts.length; ++i) {
            expect(els.get(i).getText()).toEqual(expectedProducts[i]);
        }
    });

    it('performs a client search for 10DIT2BEN on MAS database', function () {
        menu.podSelect('MAS');
        menu.clientSearch('10DIT2BEN');

        //Test each result presented by popover
        expect(element(by.id('clientCode')).getInnerHtml()).toBe('10DIT2BEN');
        expect(element(by.id('clientOID')).getInnerHtml()).toBe(' G3CC7Q4AP7BZ8JSM');
        expect(element(by.id('podCode')).getInnerHtml()).toBe(' WFN_DIT4');

        //iterates over the list of products
        var expectedProducts = ['WFN 13', 'WFNEZLM 13', 'WFNPAYX 13'];
        var els = element.all(by.repeater('product in selectedClient.products'));
        for (var i = 0; i < expectedProducts.length; ++i) {
            expect(els.get(i).getText()).toEqual(expectedProducts[i]);
        }
    });
});
