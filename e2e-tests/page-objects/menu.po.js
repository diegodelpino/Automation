'use strict';

var SqlCommand = require('../page-objects/sqlCommand.po.js');

var InsightMenu = function () {
    var EC = protractor.ExpectedConditions;
    var _this = this;

    //variables
    _this.insightTools = element(by.id('insightTools'));
    _this.mainPageLink = element(by.id('mainPageLink'));
    _this.clientSearchInput = element(by.id('clientSearchInput'));
    _this.clientSearchBtn = element(by.id('clientSearchBtn'));
    _this.sqlCommandItem = element(by.id('sqlCommand'));
    _this.panelHomePage = element(by.css('div.panel.panel-default.card'));

    //client Search popover variables
    _this.clientSearchPopoverClientCode = element(by.id('clientCode'));
    var sqlCommand = new SqlCommand();
    var EC = protractor.ExpectedConditions;

    //functions
    this.podSelect = podSelect;
    this.accessSqlCommand = accessSqlCommand;
    this.clientSearch = clientSearch;
    this._accessMenuItem = _accessMenuItem;
    this.accessHomePage = accessHomePage;
    this.verify = verify;
    // this._sendKeys = _sendKeys;

    function verify() {
        browser.wait(EC.elementToBeClickable(this.mainPageLink), 5000, 'Insight application is not loaded');
    };

    function podSelect(pod) {
        element(by.cssContainingText('option', pod)).click();
    };

    function accessSqlCommand() {
        _this._accessMenuItem(_this.sqlCommandItem, sqlCommand);
    };

    function accessHomePage() {
        this.verify();
        //TODO: Fix this method. It does not work properly
        browser.actions()
            .mouseMove(_this.mainPageLink)
            .click()
            .perform();
    }

    function _accessMenuItem(item, page) {
        this.verify();
        browser.actions()
            .mouseMove(_this.insightTools)
            .click()
            .perform();
        _this.insightTools.click().then(function () {
            item.click();
        });
        page.verify();
        // this.verify();
        // browser.actions()
        //     .mouseMove(_this.insightTools)
        //     .perform();
        // browser.actions()
        //     .mouseMove(item).click().perform();
        // page.verify();
    }

    function clientSearch(clientID) {
        browser.wait(EC.elementToBeClickable(this.clientSearchInput), 4000);
        _this.clientSearchInput.clear().then(function () {
            _this.clientSearchInput.sendKeys(clientID);
        });
        _this.clientSearchBtn.click();
        browser.wait(EC.elementToBeClickable(_this.clientSearchPopoverClientCode), 4000);
    };
}

module.exports = InsightMenu;