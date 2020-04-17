'use strict';

const Nick = require("nickjs");
const utils = require("./utils/utils");
const findChrome = require("chrome-finder");

const nick = new Nick({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
});

let seedUrlFile = './seed-urls.txt';
let chromePath  = findChrome();

console.log(chromePath);

(async () => {

    let lines = utils.readlines(seedUrlFile);
    lines.forEach(async (line) => {
        const tab = await nick.newTab();
        tab.open(line);

        console.log('Injecting jQuery...');
        await tab.inject('https://code.jquery.com/jquery-3.1.1.slim.min.js');

        const title = await tab.evaluate((arg, done) => {
            done(null, jQuery('title').text())
        });

        console.log('The title is: ' + title);
        tab.close();
    });
})()
    .then(() => {
        console.log('job done');
        nick.exit();
    })
    .catch((err) => {
        console.log(`something went wrong: ${err}`);
        nick.exit();
    });
