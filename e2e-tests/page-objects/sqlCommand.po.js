'use strict';
var globals = require('../specs/globalVariables.js');

var SqlCommand = function () {

    var EC = protractor.ExpectedConditions;

    this.sqlInput = element(by.css('div.ace_content'));
    this.executeSqlBtn = element(by.id('executeBtn'));
    this.sqlCountCkbox = element(by.id('showSqlCount'));
    this.podSelector = element(by.id('pod'));
    this.explainPlanBtn = element(by.id('explainPlanBtn'));
    this.explainPlanLink = element(by.id('explainPlanLink'));
    this.explainPlanResult = element.all(by.id('explainPlanResult')).get(0);
    this.sqlCommandGrid = element(by.id('sqlCommandGrid'));

    //Sql Library Objects
    this.sqlLibraryWindow = element(by.css('.popover-content'));
    this.sqlLibraryBtn = element(by.id('sqlLibraryBtn'));
    this.sqlLibraryMyListsTab = element(by.id('myListsTab'));
    this.sqlLibrarySharedListsTab = element(by.id('sharedListsTab'));
    this.addToLibraryBtn = element(by.id('addToLibrary'));
    this.addQueryListBtn = element(by.id('addQueryList'));
    this.deleteSqlIcon = element.all(by.id('iDeleteTreeItem'));
    this.copySqlIcon = element.all(by.id('iCopyTreeItem'));
    this.editSqlIcon = element.all(by.id('iEditTreeItem'));

    //Sql Library Objects - Add Query List Modal Screen
    this.saveQueryListWindow = element(by.id('libSqlQueryWindow'));
    this.saveQueryListName = element(by.id('libSqlQueryListName'));
    this.saveQueryListDescription = element(by.id('libSqlQueryListDescription'));
    this.saveQueryListMode = element(by.id('libSqlQueryListMode'));
    this.saveQueryListSave = element(by.id('libSqlQueryListSave'));
    this.saveQueryListCancel = element(by.id('libSqlQueryListCancel'));

    //Sql Library Objects - Add to library Modal Screen
    this.addToLibraryWindow = element(by.id('libSqlModalWindow'));
    this.addToLibraryName = element(by.id('inSQLName'));
    this.addToLibraryList = element(by.id('selSQLList'));
    this.addToLibraryQueryPreview = element(by.id('txtSQLPrev'));
    this.addToLibrarySave = element(by.id('btnSaveSQL'));
    this.addToLibraryCancel = element(by.id('btnCancelSQL'));

    //Sql History Objects
    this.sqlHistoryScreen = element(by.id('sqlCommandHistoryPopover'));
    this.sqlHistoryButton = element(by.id('sqlCommandHistoryBtn'));
    var sqlHistory = element.all(by.repeater('historyItem in vm.historyData'));


    //Assignment of functions
    this.clearSqlInput = clearSqlInput;
    this.addSQLToLibrary = addSQLToLibrary;
    this.fillFormSaveQueryList = fillFormSaveQueryList;
    this.openSqlLibrary = openSqlLibrary;
    this.selectElement = selectElement;
    this.editSQLOnLibraryView = editSQLOnLibraryView;
    this.copySQLOnLibraryView = copySQLOnLibraryView;
    this.loadSQLFromLibrary = loadSQLFromLibrary;
    this.selectSqlLibraryTab = selectSqlLibraryTab;
    this.findSQLOnQueryList = findSQLOnQueryList;
    this.deleteSql = deleteSql;
    this.findQueryList = findQueryList;
    this.podSelect = podSelect;
    this.executeSql = executeSql;
    this.setSql = setSql;
    this.verify = verify;
    this.getSqlHistory = getSqlHistory;
    this.loadSqlHistoryElement = loadSqlHistoryElement;
    this.openSqlHistory = openSqlHistory;
    this.closeSqlHistory = closeSqlHistory;
    this.getSqlHistory = getSqlHistory;
    this.getSqlHistoryElement = getSqlHistoryElement;
    this.loadSqlHistoryElement = loadSqlHistoryElement;

    var txtHistElements = [];

    //Declaration of functions
    function verify() {
        browser.wait(EC.elementToBeClickable(this.executeSqlBtn), 5000, 'Execute Sql Button not loaded');
    };

    function getSql() {
        this.verify();
        var sqlText = this.sqlInput.getText();
        return sqlText;
    };

    function openSqlHistory() {
        //this.verify();
        if (EC.invisibilityOf(this.sqlHistoryScreen)) {
            this.sqlHistoryButton.click();
         //   browser.wait(EC.visibilityOf(this.sqlHistoryScreen), 5000, 'Sql History Screen not loaded on OpenSqlHistory function');
        };
    };

    function closeSqlHistory() {
        this.verify();
        if (EC.visibilityOf(this.sqlHistoryScreen)) {
            this.sqlHistoryButton.click();
            browser.wait(EC.invisibilityOf(this.sqlHistoryScreen), 5000, 'Sql History Screen not loaded');
        };
    };

    function getSqlHistory() {
        this.openSqlHistory();
        //var sqlHist = this.sqlHistory;
        //return this.sqlHistory;
        return element.all(sqlHistory);
    };

    function getSqlHistoryElement(elementId) {
        this.openSqlHistory();
        //var a = element.all(by.repeater('historyItem in vm.historyData')).get(elementId).getAttribute("innerHTML"); 
        //return a;
        return element.all(by.repeater('historyItem in vm.historyData')).get(elementId).getAttribute("innerHTML");
    };

    function loadSqlHistoryElement(elementId) {
        this.openSqlHistory();
        var elementFound = this.sqlHistory.get(i).getAttribute("innerHTML").getText();
        browser.actions().click(elementFound).perform();
        this.closeSqlHistory();
        return elementFound;
    };

    function clearSqlInput() {
        this.verify();
        browser.actions().click(this.sqlInput)
            .keyDown(protractor.Key.CONTROL)
            .sendKeys('a')
            .perform().then(function () {
                browser.actions().sendKeys(protractor.Key.DELETE).perform();
            });

        //browser.wait(EC.elementToBeClickable(this.sqlInput), 1000);
        //browser.actions().sendKeys(protractor.Key.DELETE).perform();
    };

    function addSQLToLibrary(sqlName, listName, sql) {
        console.log('[ADD] Adding the element "' + sqlName + '" that should be available on list ' + listName);
        browser.wait(EC.elementToBeClickable(this.addToLibraryBtn), 1000);
        this.setSql(sql);
        this.addToLibraryBtn.click();
        browser.wait(EC.elementToBeClickable(this.addToLibraryName), 1000);
        browser.actions()
            .click(this.addToLibraryName)
            .sendKeys(sqlName).perform();
        element(by.cssContainingText('option', listName)).click();
        this.addToLibrarySave.click();
        browser.wait(EC.elementToBeClickable(this.addToLibraryBtn), 1000);
    };

    function fillFormSaveQueryList(listName, listDescription, listMode) {
        expect(saveQueryListWindow.waitReady()).toBeTruthy();
        browser.wait(EC.elementToBeClickable(this.sqlLibraryBtn), 1000);

        browser.actions()
            .click(this.saveQueryListName)
            .sendKeys(listName).perform();

        browser.actions()
            .click(this.saveQueryListDescription)
            .sendKeys(description).perform();

        element(by.cssContainingText('option', mode)).click();
    };

    function openSqlLibrary() {
        this.sqlLibraryBtn.click();
    };

    function selectElement(sqlName, libraryTab, listName) {
        console.log('Selecting the element ' + sqlName + " that should be available on tab " + libraryTab + " inside the list " + listName);
        try {
            browser.wait(EC.elementToBeClickable(this.sqlLibraryBtn), 5000, 'sqlLibraryBtn is not clickable');
        } catch (error) {
            if (EC.visibilityOf($('#myListsTab'))) {
                this.sqlLibraryBtn.click();

                browser.wait(EC.elementToBeClickable(this.sqlLibraryBtn), 1000, 'sqlLibraryBtn is not clickable after close the library');
            }
        }
        this.sqlLibraryBtn.click();
        var searchListObj = '//*[@id="aTreeItem"][.="' + listName + '"]';
        var searchQryObj = '//*[@id="aTreeItem"][.="' + sqlName + '"]';
        this.selectSqlLibraryTab(libraryTab);
        browser.actions().click(element(By.xpath(searchListObj))).perform();
        browser.actions().click(element(By.xpath(searchQryObj))).perform();
    };

    function editSQLOnLibraryView(currentSqlName, currentSqlTab, currentSqlList, newSqlName, newlistName, newSql) {
        console.log("[EDIT] Trying to edit " + currentSqlName);
        this.selectElement(currentSqlName, currentSqlTab, currentSqlList);
        this.editSqlIcon.
            filter(function (elem) {
                return elem.isDisplayed();
            }).
            first().
            click();
        if (newSqlName) {
            console.log("It should change its name to " + newSqlName);
            this.addToLibraryName.clear();
            browser.actions()
                .click(this.addToLibraryName)
                .sendKeys(newSqlName).perform();
        }
        if (newlistName) {
            console.log("It should be present on the list " + newlistName);
            element(by.cssContainingText('option', newlistName)).click();
        }
        if (newSql) {
            console.log("It should have its SQL changed to " + newSql);
            this.addToLibraryQueryPreview.clear();
            browser.actions()
                .click(this.addToLibraryQueryPreview)
                .sendKeys(newSql).perform();
        }
        expect(this.addToLibrarySave.isEnabled()).toBeTruthy();
        browser.actions()
            .mouseMove(this.addToLibrarySave)
            .click()
            .perform();
        browser.wait(EC.elementToBeClickable(this.sqlLibraryBtn), 1000);
    };

    function copySQLOnLibraryView(currentSqlName, currentSqlTab, currentSqlList, newSqlName, newlistName, newSql) {
        console.log("[COPY] Trying to copy " + currentSqlName);
        this.selectElement(currentSqlName, currentSqlTab, currentSqlList);
        this.copySqlIcon.
            filter(function (elem) {
                return elem.isDisplayed();
            }).
            first().
            click();
        if (newSqlName) {
            console.log("It should change its name to " + newSqlName);
            this.addToLibraryName.clear();
            browser.actions()
                .click(this.addToLibraryName)
                .sendKeys(newSqlName).perform();
        }
        if (newlistName) {
            console.log("It should be present on the list " + newlistName);
            element(by.cssContainingText('option', newlistName)).click();
        }
        if (newSql) {
            console.log("It should have its SQL changed to " + newSql);
            this.addToLibraryQueryPreview.clear();
            browser.actions()
                .click(this.addToLibraryQueryPreview)
                .sendKeys(newSql).perform();
        }
        expect(this.addToLibrarySave.isEnabled()).toBeTruthy();
        browser.actions()
            .mouseMove(this.addToLibrarySave)
            .click()
            .perform();
        browser.wait(EC.elementToBeClickable(this.sqlLibraryBtn), 1000);
    }

    function loadSQLFromLibrary(sqlName, libraryTab, listName) {

        console.log("[LOAD] Loading the element " + sqlName + " that should be present below " + listName + " on tab " + libraryTab);
        browser.wait(EC.elementToBeClickable(this.sqlLibraryBtn), 1000);
        this.selectElement(sqlName, libraryTab, listName);
        var searchQryObj = '//*[@id="aTreeItem"][.="' + sqlName + '"]';
        browser.actions().doubleClick(element(By.xpath(searchQryObj))).perform();
    };

    function selectSqlLibraryTab(libraryTab) {
        browser.wait(EC.visibilityOf($('#myListsTab')), 1000);
        if (libraryTab = 'My Lists') {
            browser.actions()
                .click(this.sqlLibraryMyListsTab)
                .perform();
        }
        else if (libraryTab = 'Shared Lists') {
            browser.actions()
                .click(this.sqlLibrarySharedListsTab)
                .perform();
        }
    };

    function findSQLOnQueryList(sqlName, libraryTab, listName) {
        console.log("Searching for the element " + sqlName + " that should be present below " + listName + " on tab " + libraryTab);
        var searchQryObj = '//*[@id="aTreeItem"][.="' + sqlName + '"]';
        this.selectElement(sqlName, libraryTab, listName);
        return element(By.xpath(searchQryObj));
    };

    function deleteSql(sqlName, libraryTab, listName) {
        console.log("[DELETE] Deleting the element " + sqlName + " that should be present below " + listName + " on tab " + libraryTab);
        this.selectElement(sqlName, libraryTab, listName);
        this.deleteSqlIcon.
            filter(function (elem) {
                return elem.isDisplayed();
            }).
            first().
            click();
        var myAlertText;
        browser.wait(EC.alertIsPresent(), 5000);
        browser.switchTo().alert()
            .then(function (alert) {
                if (alert) {
                    alert.getText(function (alertText) {
                        expect(alertText).toContain('SQL has been deleted');
                        myAlertText = alertText;
                    });
                    alert.dismiss();
                }
            });
        browser.wait(EC.elementToBeClickable(this.sqlLibraryBtn), 5000);
        var searchQryObj = '//*[@id="aTreeItem"][.="' + sqlName + '"]';
        return element(By.xpath(searchQryObj));
    };

    function findQueryList(tab, queryListName) {
        //:TODO searches on a specific tab for a saved query list  
        //
        var sqlQueryObjectFound = null;
        return queryListObjectFound;
    };

    function podSelect(pod) {
        element(by.cssContainingText('option', pod)).click();
    };

    function executeSql(pod, sql) {
        browser.wait(EC.elementToBeClickable(this.sqlInput), 1000);
        element(by.cssContainingText('option', pod)).click();
        browser.actions()
            .click(this.sqlInput)
            .sendKeys(sql).perform();
        browser.wait(EC.elementToBeClickable(this.executeSqlBtn), 1000);
        this.executeSqlBtn.click();
        //TODO: make this code wait for sql to bring results
    };

    function setSql(sql) {
        browser.actions()
            .click(this.sqlInput)
            .sendKeys(sql).perform();
    };
};
module.exports = SqlCommand;