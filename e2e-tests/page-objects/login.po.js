'use strict';

const url = 'http://localhost:9000';
var Menu = require('../page-objects/menu.po.js');
var LoginPage = function () {
  var EC = protractor.ExpectedConditions;
  var menu = new Menu();

  this.loginLink = element(by.id('loginLink'));
  this.headerUser = element(by.id('HTTP_SM_USER'));
  this.headerUserDN = element(by.id('HTTP_SM_USERDN'));
  this.headerProfileDN = element(by.id('HTTP_PROFILEDN'));
  this.headerAppID = element(by.id('HTTP_APPID'));
  this.submitBtn = element(by.id('loginBtn'));

  this.accessLoginPage = accessLoginPage;

  function accessLoginPage() {
    browser.get('');
    this.loginLink.click();
    browser.actions()
      .mouseMove(this.headerUser)
      .click()
      .sendKeys('user')
      .perform();
    browser.actions()
      .mouseMove(this.headerUserDN)
      .click()
      .sendKeys('uid=user,ou=Users,o=adp.com')
      .perform();
    browser.actions()
      .mouseMove(this.headerProfileDN)
      .click()
      .sendKeys('adpProfileID=profile,adpProductCode=CRT,ou=Products,o=adp.com')
      .perform();
    browser.actions()
      .mouseMove(this.submitBtn)
      .click()
      .perform();
    menu.verify();
  };

};
module.exports = LoginPage;