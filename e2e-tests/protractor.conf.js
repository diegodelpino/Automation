//jshint strict: false

exports.config = {

    allScriptsTimeout: 11000,

    specs: [
        // './specs/*.spec.js',
        //'./specs/clientSearch.spec.js',
        //'./specs/explainPlan.spec.js',
        //'./specs/podGroupSwitch.spec.js',
        //'./specs/sqlCommand.spec.js',
        //'./specs/sqlLibrary.spec.js',
        './specs/sqlHistory.spec.js'
    ],

    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            args: ['--start-maximized']
        },
    },

    //  baseUrl: 'http://10.1.168.119:9080/DataCloudInsightUI/',
    baseUrl: 'http://localhost:9000/',
    framework: 'jasmine2',

    onPrepare: function () {
        var jasmineReporters = require('jasmine-reporters');
        var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

        browser.driver.manage().window().setSize(1280, 1024);

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: '/e2e-tests/testresults',
            filePrefix: 'xmloutput'
        }));
        jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
            dest: "screenshots"
        }));

    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 600000,
    }
};
